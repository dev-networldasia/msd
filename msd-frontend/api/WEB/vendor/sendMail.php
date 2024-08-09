<?php
require_once "phpmailer/phpmailer/src/Exception.php";
require_once "phpmailer/phpmailer/src/PHPMailer.php";
require_once "phpmailer/phpmailer/src/SMTP.php";
require_once "phpmailer/phpmailer/src/POP3.php";
require_once "phpmailer/phpmailer/src/SMTP.php";
require_once "common/connect.inc.php";
require_once "common/sysenv.php";

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

class Mail
{
    public function sendMailAddHotelTour($emailHotelTour, $result_emailSetting, $host, $userName, $password, $smtpPort, $port, $hotelTourName,$madonhang, $hotelOrTour)
    {
        $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
        $mail->CharSet = 'UTF-8';
        try {
            //Server settings
            $mail->SMTPDebug = 0;                                 // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = $host;  // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = $userName;                 // SMTP username
            $mail->Password = $password;                           // SMTP password
            $mail->SMTPSecure = $smtpPort;                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = $port;                                    // TCP port to connect to

            //Recipients
            $mail->setFrom($result_emailSetting, 'MOneTrip');
            $mail->addAddress($emailHotelTour, $emailHotelTour);     // Add a recipient
            // $mail->addAddress('ellen@example.com');               // Name is optional
            // $mail->addReplyTo('info@example.com', 'Information');
            $mail->addCC($result_emailSetting);
            // $mail->addBCC('bcc@example.com');

            //Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

            //Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = "Admin MOneTrip";
            $mail->Body    = '<!doctype html>
            <html lang="en">
            <head>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <title>MOnetrip mail form</title>
            <style>
                        *,
                        *::before,
                        *::after {
            box-sizing: border-box;
        }
        
        html {
            font-family: sans-serif;
            line-height: 1.15;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            -ms-overflow-style: scrollbar;
            -webkit-tap-highlight-color: transparent;
        }
        
        @-ms-viewport {
            width: device-width;
        }
        
        article,
        aside,
        dialog,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        main,
        nav,
        section {
            display: block;
        }
        
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            text-align: left;
            background-color: #fff;
        }
        
        [tabindex="-1"]:focus {
            outline: 0 !important;
        }
        
        hr {
            box-sizing: content-box;
            height: 0;
            overflow: visible;
        }
        
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin-top: 0;
            margin-bottom: 0.5rem;
        }
        
        p {
            margin-top: 0;
            margin-bottom: 1rem;
        }
        
        abbr[title],
        abbr[data-original-title] {
            text-decoration: underline;
            -webkit-text-decoration: underline dotted;
            text-decoration: underline dotted;
            cursor: help;
            border-bottom: 0;
        }
        
        address {
            margin-bottom: 1rem;
            font-style: normal;
            line-height: inherit;
        }
        
        ol,
        ul,
        dl {
            margin-top: 0;
            margin-bottom: 1rem;
        }
        
        ol ol,
        ul ul,
        ol ul,
        ul ol {
            margin-bottom: 0;
        }
        
        dt {
            font-weight: 700;
        }
        
        dd {
            margin-bottom: .5rem;
            margin-left: 0;
        }
        
        blockquote {
            margin: 0 0 1rem;
        }
        
        dfn {
            font-style: italic;
        }
        
        b,
        strong {
            font-weight: bolder;
        }
        
        small {
            font-size: 80%;
        }
        
        sub,
        sup {
            position: relative;
            font-size: 75%;
            line-height: 0;
            vertical-align: baseline;
        }
        
        sub {
            bottom: -.25em;
        }
        
        sup {
            top: -.5em;
        }
        
        a {
            color: #007bff;
            text-decoration: none;
            background-color: transparent;
            -webkit-text-decoration-skip: objects;
        }
        
        a:hover {
            color: #0056b3;
            text-decoration: underline;
        }
        
        a:not([href]):not([tabindex]) {
            color: inherit;
            text-decoration: none;
        }
        
        a:not([href]):not([tabindex]):hover,
        a:not([href]):not([tabindex]):focus {
            color: inherit;
            text-decoration: none;
        }
        
        a:not([href]):not([tabindex]):focus {
            outline: 0;
        }
        
        pre,
        code,
        kbd,
        samp {
            font-family: monospace, monospace;
            font-size: 1em;
        }
        
        pre {
            margin-top: 0;
            margin-bottom: 1rem;
            overflow: auto;
            -ms-overflow-style: scrollbar;
        }
        
        figure {
            margin: 0 0 1rem;
        }
        
        img {
            vertical-align: middle;
            border-style: none;
            max-width: 100%;
            height: auto;
            display: inline-block;
        }
        
        svg:not(:root) {
            overflow: hidden;
        }
        
        table {
            border-collapse: collapse;
        }
        
        caption {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            color: #6c757d;
            text-align: left;
            caption-side: bottom;
        }
        
        th {
            text-align: inherit;
        }
        
        label {
            display: inline-block;
            margin-bottom: .5rem;
        }
        
        button {
            border-radius: 0;
        }
        
        button:focus {
            outline: 1px dotted;
            outline: 5px auto -webkit-focus-ring-color;
        }
        
        input,
        button,
        select,
        optgroup,
        textarea {
            margin: 0;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
        }
        
        button,
        input {
            overflow: visible;
        }
        
        button,
        select {
            text-transform: none;
        }
        
        button,
        html [type="button"],
        [type="reset"],
        [type="submit"] {
            -webkit-appearance: button;
        }
        
        button::-moz-focus-inner,
        [type="button"]::-moz-focus-inner,
        [type="reset"]::-moz-focus-inner,
        [type="submit"]::-moz-focus-inner {
            padding: 0;
            border-style: none;
        }
        
        input[type="radio"],
        input[type="checkbox"] {
            box-sizing: border-box;
            padding: 0;
        }
        
        input[type="date"],
        input[type="time"],
        input[type="datetime-local"],
        input[type="month"] {
            -webkit-appearance: listbox;
        }
        
        textarea {
            overflow: auto;
            resize: vertical;
        }
        
        fieldset {
            min-width: 0;
            padding: 0;
            margin: 0;
            border: 0;
        }
        
        legend {
            display: block;
            width: 100%;
            max-width: 100%;
            padding: 0;
            margin-bottom: .5rem;
            font-size: 1.5rem;
            line-height: inherit;
            color: inherit;
            white-space: normal;
        }
        
        progress {
            vertical-align: baseline;
        }
        
        [type="number"]::-webkit-inner-spin-button,
        [type="number"]::-webkit-outer-spin-button {
            height: auto;
        }
        
        [type="search"] {
            outline-offset: -2px;
            -webkit-appearance: none;
        }
        
        [type="search"]::-webkit-search-cancel-button,
        [type="search"]::-webkit-search-decoration {
            -webkit-appearance: none;
        }
        
        ::-webkit-file-upload-button {
            font: inherit;
            -webkit-appearance: button;
        }
        
        output {
            display: inline-block;
        }
        
        summary {
            display: list-item;
            cursor: pointer;
        }
        
        template {
            display: none;
        }
        
        [hidden] {
            display: none !important;
        }
        
        /*# sourceMappingURL=bootstrap-reboot.css.map */
        /*  */
        @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap");
        </style>
        
        </head>
        
        <body>
        <div class="mail-form" style="padding:20px;background:#fff;max-width: 640px;margin-inline: auto;">
        <div style="text-align:center;">
        <img src="http://monetrip.bdata.asia/img/logo.png" style="height:60px;">
        </div>
        <div style="font-style: italic;">
        <h2>You have requested to cancel your  '. $hotelTourName .' with order code '. $madonhang .' </h2>
        </div>
        <div>
        <p><span style="font-weight: 700;">Your email:</span> '. $emailHotelTour .'</p>
        </div>
        <div style="padding:20px;background-color: #006CE5;">
        <div style="display: flex;margin-inline: -15px;">
        <div style="width:100%;padding-inline: 15px;text-align: center;color:#fff">
        <h3>MOneTrip information</h3>
        <h3>Email: <a style="font-weight:normal;color:#fff;text-decoration:underline;" href="mailto:'.$result_emailSetting.'">'.$result_emailSetting.'</a></h3>
        </div>
        <!-- <div style="width:50%;padding-inline: 15px;"></div> -->
        </div>
        </div>
        </div>
        </body>
        
        </html>';
            // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            // echo 'Message has been sent';
        } catch (Exception $e) {
            echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        }
    }
}
