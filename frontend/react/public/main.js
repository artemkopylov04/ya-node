Notification.requestPermission().then(function(permission) { console.log('permission', permission)});

const pushButton = document.getElementById('subscribe__button');
pushButton.addEventListener('click', () => {
    pushButton.disabled = true;
    subscribeUser();
});

function subscribeUser() {
    const applicationServerPublicKey = 'BGUuPCm9_oSJPAyLDqyXZa_AbiHPX7rfGppo5Um7eSkXgFXNsCWLk_kog-eClxpzxyzU_2JHyNO6jR0YPFPBwg0';
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    navigator.serviceWorker.ready
    .then((reg) => reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    }))
    .then(subscription => {
        console.log('User is subscribed.');
        updateServerSubscriptionObject(subscription);
        console.log(JSON.stringify(subscription));
        isSubscribed = true;
    })
    .catch(err => {
        if (Notification.permission === 'denied') {
        console.warn('Permission for notifications was denied');
        } else {
        console.error('Failed to subscribe the user: ', err);
        }
    });
}

function updateServerSubscriptionObject(data = {}) {
    fetch('/api/subscription/update', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .catch(e => console.error(e));
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}