export function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

export function formatDate(date) {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getUTCMonth() + 1),
            padTo2Digits(date.getUTCDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getUTCHours()),
            padTo2Digits(date.getUTCMinutes()),
            padTo2Digits(date.getUTCSeconds()),
        ].join(':')
    );
}