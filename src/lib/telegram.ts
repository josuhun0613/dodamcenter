const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramNotification(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('텔레그램 환경변수가 설정되지 않았습니다.');
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
  } catch (error) {
    console.error('텔레그램 알림 전송 실패:', error);
  }
}

export function formatInquiryMessage(inquiry: {
  name: string;
  phone: string;
  email?: string;
  counselingType: string;
  message: string;
}) {
  return [
    '📩 <b>새 상담 문의가 접수되었습니다</b>',
    '',
    `<b>이름:</b> ${inquiry.name}`,
    `<b>연락처:</b> ${inquiry.phone}`,
    inquiry.email ? `<b>이메일:</b> ${inquiry.email}` : '',
    `<b>상담유형:</b> ${inquiry.counselingType}`,
    `<b>내용:</b> ${inquiry.message}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function formatPhoneBookingMessage(booking: {
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  note?: string;
}) {
  return [
    '📞 <b>새 전화예약이 접수되었습니다</b>',
    '',
    `<b>이름:</b> ${booking.name}`,
    `<b>연락처:</b> ${booking.phone}`,
    `<b>희망일:</b> ${booking.preferredDate}`,
    `<b>희망시간:</b> ${booking.preferredTime}`,
    booking.note ? `<b>메모:</b> ${booking.note}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}
