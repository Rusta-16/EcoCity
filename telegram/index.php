<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Обработка preflight запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ваши данные Telegram
define('BOT_TOKEN', '8146476996:AAEYSgoYziL506GxS0S51d-vaDUPJjBuQaQ');
define('CHANNEL_ID', '-1003761505402'); // Убедитесь, что ID правильный

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Получаем JSON данные
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Валидация данных
    $name = trim(htmlspecialchars($input['name'] ?? ''));
    $phone = trim(htmlspecialchars($input['phone'] ?? ''));
    $comment = trim(htmlspecialchars($input['comment'] ?? 'Не указано'));
    
    // Проверка обязательных полей
    if (empty($name)) {
        echo json_encode(['success' => false, 'message' => 'Введите ваше имя']);
        exit;
    }
    
    if (empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Введите ваш телефон']);
        exit;
    }
    
    // Формируем сообщение для Telegram
    $message = "📋 Новая заявка с сайта:\n\n";
    $message .= "👤 Имя: $name\n";
    $message .= "📞 Телефон: $phone\n";
    $message .= "💬 Комментарий: $comment\n\n";
    $message .= "🕒 " . date('d.m.Y H:i:s');
    
    // Отправляем в Telegram
    $url = "https://api.telegram.org/bot" . BOT_TOKEN . "/sendMessage";
    
    $postData = [
        'chat_id' => CHANNEL_ID,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postData,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => false
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        echo json_encode(['success' => true, 'message' => 'Заявка отправлена!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка отправки в Telegram']);
    }
    
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Метод не разрешен']);
}
?>