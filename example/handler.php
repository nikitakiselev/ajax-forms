<?php

require_once __DIR__ . '/vendor/autoload.php';

$post = $_POST;
$formId = isset($post['form_id']) ? $post['form_id'] : null;

use DigitalHammer\LpForms\Form;
use DigitalHammer\LpForms\Mailer;
use DigitalHammer\LpForms\FormHandler;

/**
 * Settings
 */
$siteName = 'Your site name';
$mailFrom = ['from@mail.com', $siteName];
$mailTo = 'to@mail.com';

/**
 * Contact form
 */
$contactFormMailer = new Mailer($mailFrom, $mailTo);
$contactFormMailer->setSubject('New request from ' . $siteName);

$contactForm = new Form('contact-form', $post, $contactFormMailer);
$contactForm
    ->addField('username', ['required'])
    ->addField('email', ['required', 'email'])
    ->addField('message', ['required'])
    ->setFieldNames([
        'username' => 'Your name',
        'email' => 'Your e-mail',
        'message' => 'Your message',
    ])
    ->setMessageBodyTemplate('emails/contact');

$formHandler = new FormHandler();
$formHandler->addForm($contactForm);

// Handle form!
try {

    $formHandler->handle($formId);

} catch (Exception $exception) {

    $response = new \DigitalHammer\LpForms\ResponseJson();

    echo $response->fail($exception->getMessage());
}