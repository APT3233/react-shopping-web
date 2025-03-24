import bcryptjs from 'bcryptjs';

export async function hashPassword(plainPassword) {
  const saltRounds = 12;
  const hashedPassword = await bcryptjs.hash(plainPassword, saltRounds);
  return hashedPassword;
}

export const getCookie = (cname) =>{
  var name = cname + '='
  var ca =document.cookie.split(';')
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while(c.charAt(0) === ' ')
        c = c.substring(1)
    if(c.indexOf(name) === 0)
      return c.substring(name.length, c.length)
  }

  return undefined
}

export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString(); 
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/'; 
};

export const clearCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }
}

export const sendFeedBack = async (name, address, phone, message) => {
  const BOT_TOKEN = import.meta.env.VITE_API_BOT;
  const CHAT_ID = import.meta.env.VITE_CHAT_ID;
  
  const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  const text = `
📝 ------ New Feedback Received ------
👤 *Name*: ${name}  
📍 *Address*: ${address}  
📱 *Phone*: ${phone}  
💬 *Message*: ${message}
  `.trim();

  try {
    const response = await fetch(TELEGRAM_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "Markdown", 
      }),
    });

    const data = await response.json();
    

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
