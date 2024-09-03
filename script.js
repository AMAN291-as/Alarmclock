let alarmTime = null;
let alarmTimeout = null;

function updateTime() {
    const currentTime = new Date();
    document.getElementById('current-time').innerText = currentTime.toLocaleTimeString('en-US', { hour12: false });

    if (alarmTime && currentTime >= alarmTime) {
        clearTimeout(alarmTimeout);
        alarmTimeout = null;
        alarmTime = null;
        document.getElementById('alarm-status').innerText = 'Alarm ringing!';
        playAlarmSound();
        alert('Alarm ringing!');
    }
}

function setAlarm() {
    const alarmInput = document.getElementById('alarm-time').value;
    if (!alarmInput) {
        alert('Please set a valid alarm time.');
        return;
    }

    const [hours, minutes] = alarmInput.split(':');
    alarmTime = new Date();
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(0);
    alarmTime.setMilliseconds(0);

    if (alarmTime <= new Date()) {
        alert('Please set a future time for the alarm.');
        alarmTime = null;
        return;
    }

    document.getElementById('alarm-status').innerText = `Alarm set for ${alarmTime.toLocaleTimeString('en-US', { hour12: false })}`;
    alarmTimeout = setTimeout(() => {
        document.getElementById('alarm-status').innerText = 'Alarm ringing!';
        playAlarmSound();
        alert('Alarm ringing!');
    }, alarmTime - new Date());
}

function playAlarmSound() {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.play();
}

setInterval(updateTime, 1000);
