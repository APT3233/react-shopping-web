package com.apt.utils;

import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import java.io.*;
import java.net.Socket;
import java.util.Base64;
import java.util.Random;

public class SmsUtils {

    private static final String SMTP_HOST = "smtp.gmail.com";
    private static final int SMTP_PORT = 587;
    private static final String EMAIL_USERNAME = "server02109@gmail.com";
    private static final String EMAIL_PASSWORD = "fzdwrflojuqagmud";

    public static String sendVerificationEmail(String toEmail) {
        String verificationCode = generateVerificationCode();

        try {
            Socket socket = new Socket(SMTP_HOST, SMTP_PORT);
            BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter writer = new PrintWriter(socket.getOutputStream(), true);

            reader.readLine(); // Đọc phản hồi ban đầu từ server

            // Gửi EHLO
            writer.println("EHLO localhost");
            String response;
            while ((response = reader.readLine()) != null && response.startsWith("250-")) {}

            writer.println("STARTTLS");
            reader.readLine();

            SSLSocketFactory sslSocketFactory = (SSLSocketFactory) SSLSocketFactory.getDefault();
            SSLSocket sslSocket = (SSLSocket) sslSocketFactory.createSocket(socket, SMTP_HOST, SMTP_PORT, true);
            BufferedReader sslReader = new BufferedReader(new InputStreamReader(sslSocket.getInputStream()));
            PrintWriter sslWriter = new PrintWriter(sslSocket.getOutputStream(), true);

            sslWriter.println("EHLO localhost");
            while ((response = sslReader.readLine()) != null && response.startsWith("250-")) {}

            sslWriter.println("AUTH LOGIN");
            sslReader.readLine(); 

            String encodedUsername = Base64.getEncoder().encodeToString(EMAIL_USERNAME.getBytes());
            sslWriter.println(encodedUsername);
            sslReader.readLine(); 
            String encodedPassword = Base64.getEncoder().encodeToString(EMAIL_PASSWORD.getBytes());
            sslWriter.println(encodedPassword);
            sslReader.readLine(); 

            sslWriter.println("MAIL FROM:<" + EMAIL_USERNAME + ">");
            sslReader.readLine();

            sslWriter.println("RCPT TO:<" + toEmail + ">");
            sslReader.readLine(); 

            sslWriter.println("DATA");
            sslReader.readLine(); 

            String htmlContent = "Subject: Your Password Reset Verification Code\r\n" +
                    "MIME-Version: 1.0\r\n" +
                    "Content-Type: text/html; charset=utf-8\r\n" +
                    "\r\n" +
                    "<html>" +
                    "<body style='font-family: Arial, sans-serif;'>" +
                    "<h2>Password Reset Request</h2>" +
                    "<p>Dear User,</p>" +
                    "<p>We have received a request to reset your password. Please use the following verification code to proceed:</p>"
                    +
                    "<h3 style='color: #2e6c80;'>Verification Code: " + verificationCode + "</h3>" +
                    "<p>This code is valid for <strong>5 minutes</strong>. For your security, please complete the password reset process promptly.</p>"
                    +
                    "<p>If you did not request this, please ignore this email or contact our support team at <a href='mailto:anhnkde180030@edu.fpt.vn'>thank@you.com</a>.</p>"
                    +
                    "<p>Best regards,<br>© 2025 Group of Hacker</p>" +
                    "</body>" +
                    "</html>" +
                    "\r\n.\r\n";

            sslWriter.print(htmlContent);
            sslWriter.flush();
            sslReader.readLine(); 

            sslWriter.println("QUIT");
            sslReader.readLine(); 

            sslSocket.close();
            socket.close();

            return verificationCode;

        } catch (IOException e) {
            return null;
        }
    }

    private static String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }

    public static void shutdown() {
        throw new UnsupportedOperationException("Unimplemented method 'shutdown'");
    }
}