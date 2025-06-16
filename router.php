
<?php
// Simple router for serving HTML files
$requestUri = $_SERVER['REQUEST_URI'];
$requestUri = parse_url($requestUri, PHP_URL_PATH);

// Remove leading slash
$requestUri = ltrim($requestUri, '/');

// If empty, serve index.htm
if (empty($requestUri)) {
    $requestUri = 'index.htm';
}

// If no extension, try .htm
if (!pathinfo($requestUri, PATHINFO_EXTENSION)) {
    $requestUri .= '.htm';
}

// Check if file exists
if (file_exists($requestUri)) {
    // Get file extension
    $extension = pathinfo($requestUri, PATHINFO_EXTENSION);
    
    // Set appropriate content type
    switch ($extension) {
        case 'htm':
        case 'html':
            header('Content-Type: text/html');
            break;
        case 'css':
            header('Content-Type: text/css');
            break;
        case 'js':
            header('Content-Type: application/javascript');
            break;
        case 'png':
            header('Content-Type: image/png');
            break;
        case 'jpg':
        case 'jpeg':
            header('Content-Type: image/jpeg');
            break;
        case 'gif':
            header('Content-Type: image/gif');
            break;
        case 'svg':
            header('Content-Type: image/svg+xml');
            break;
        case 'ico':
            header('Content-Type: image/x-icon');
            break;
        default:
            header('Content-Type: text/plain');
    }
    
    readfile($requestUri);
} else {
    // File not found
    http_response_code(404);
    echo "404 - File not found: " . htmlspecialchars($requestUri);
}
?>
