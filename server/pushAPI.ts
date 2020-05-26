const webPush = require('web-push');

const options = {
  TTL: 60,
  vapidDetails: {
    subject: 'mailto: artemkopylov04@gmail.com',
    privateKey: 'oYN_wpwaqBj7sMw08ue6alN_eRqh_gIO0ztY3-OsjTU',
    publicKey: 'BGUuPCm9_oSJPAyLDqyXZa_AbiHPX7rfGppo5Um7eSkXgFXNsCWLk_kog-eClxpzxyzU_2JHyNO6jR0YPFPBwg0',
  },
};

export function sendPush(subscription: any, info: string) {
  webPush.sendNotification(
    subscription,
    info,
    options,
  );
};
