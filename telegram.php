<?php

$name = $_POST['user-name']; // получаем имя клиента
$email = $_POST['user-email']; // получаем почту клиента
$message = $_POST['user-message']; // получаем сообщение клиента

// воодим между кавычек токен бота, который прислал @botfater
$token = "5488186439:AAE9z6IN4hnE2WB6gGmGj6434fFuprtz_GQ"; 
// вставляем номер чата, который можно найти на странице 
// api.telegram.org/botXXXXXXXXX/getUpdates — где XXX это токен бота
$chat_id = "1429886762";

// Собираем данные в один массив 
$arr = array(
  'Клиент: ' => $name,
  'Email: ' => $email,
  'Сообщение: ' => $message
);

// составляем сообщение из данных массива
foreach($arr as $key => $value) {
  $txt .= $key."<b> ". urlencode($value)."</b> "."%0A";
};

// даем команду боту отправить сообщение с текстом
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) { 
  return true; // если прошло успешно, возвращаем ответ true
} else {
  return false; // если ошибка, возвращаем false
}
?>