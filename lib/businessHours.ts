import { formatInTimeZone } from 'date-fns-tz';

export interface BusinessHours {
    day: number; // 0 = Sunday, 1 = Monday, etc.
    open: string; // HH:mm format
    close: string; // HH:mm format
}

export interface OpenStatus {
    isOpen: boolean;
    message: string;
    nextChange: string; // "Opens at..." or "Closes at..."
}

// Default business hours (editable)
// Opening time: 12:00 PM (noon), Closing time: 12:00 AM (midnight)
export const businessHours: BusinessHours[] = [
    { day: 0, open: '12:00', close: '00:00' }, // Sunday
    { day: 1, open: '12:00', close: '00:00' }, // Monday
    { day: 2, open: '12:00', close: '00:00' }, // Tuesday
    { day: 3, open: '12:00', close: '00:00' }, // Wednesday
    { day: 4, open: '12:00', close: '00:00' }, // Thursday
    { day: 5, open: '12:00', close: '00:00' }, // Friday
    { day: 6, open: '12:00', close: '00:00' }, // Saturday
];

const TIMEZONE = 'Asia/Kolkata';

export function getOpenStatus(now: Date = new Date()): OpenStatus {
    // Get current time in Asia/Kolkata timezone
    const currentDay = parseInt(formatInTimeZone(now, TIMEZONE, 'e')) % 7; // 0 = Sunday
    const currentTime = formatInTimeZone(now, TIMEZONE, 'HH:mm');

    const todayHours = businessHours.find(h => h.day === currentDay);

    if (!todayHours) {
        return {
            isOpen: false,
            message: 'Closed',
            nextChange: 'Hours may vary',
        };
    }

    const { open, close } = todayHours;

    // Handle midnight closing (00:00)
    // If close is 00:00 (midnight), the restaurant is open from 'open' time until midnight
    // After midnight (00:00 to 'open'), it's closed
    const isOpen = close === '00:00'
        ? currentTime >= open // Open from 12:00 onwards until midnight
        : currentTime >= open && currentTime < close;

    if (isOpen) {
        // Format closing time
        const closeTime = close === '00:00' ? '12:00 AM' : formatTime(close);
        return {
            isOpen: true,
            message: 'Open now',
            nextChange: `Closes at ${closeTime}`,
        };
    } else {
        // Find next opening time
        let nextDay = currentDay;
        let daysChecked = 0;

        while (daysChecked < 7) {
            nextDay = (nextDay + 1) % 7;
            daysChecked++;

            const nextHours = businessHours.find(h => h.day === nextDay);
            if (nextHours) {
                const openTime = formatTime(nextHours.open);
                const dayName = daysChecked === 1 ? 'tomorrow' : getDayName(nextDay);
                return {
                    isOpen: false,
                    message: 'Closed now',
                    nextChange: `Opens ${dayName} at ${openTime}`,
                };
            }
        }

        return {
            isOpen: false,
            message: 'Closed',
            nextChange: 'Hours may vary',
        };
    }
}

function formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);

    if (hours === 0) return '12:00 AM';
    if (hours < 12) return `${hours}:${minutes.toString().padStart(2, '0')} AM`;
    if (hours === 12) return `12:${minutes.toString().padStart(2, '0')} PM`;
    return `${hours - 12}:${minutes.toString().padStart(2, '0')} PM`;
}

function getDayName(day: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
}

export function getFormattedHours(): string[] {
    return businessHours.map(h => {
        const day = getDayName(h.day);
        const open = formatTime(h.open);
        const close = h.close === '00:00' ? '12:00 AM' : formatTime(h.close);
        return `${day}: ${open} - ${close}`;
    });
}
