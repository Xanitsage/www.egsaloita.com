
<?php
// Simple file server for HTML website
$requestUri = $_SERVER['REQUEST_URI'];
$requestUri = parse_url($requestUri, PHP_URL_PATH);

// Remove leading slash
$requestUri = ltrim($requestUri, '/');

// If empty, serve index.htm
if (empty($requestUri)) {
    $requestUri = 'index.htm';
}

// If no extension and not a directory, try .htm
if (!pathinfo($requestUri, PATHINFO_EXTENSION) && !is_dir($requestUri)) {
    $requestUri .= '.htm';
}

// Check if file exists
if (file_exists($requestUri) && is_file($requestUri)) {
    // Get file extension for content type
    $extension = strtolower(pathinfo($requestUri, PATHINFO_EXTENSION));
    
    // Set content type based on extension
    switch ($extension) {
        case 'htm':
        case 'html':
            header('Content-Type: text/html; charset=UTF-8');
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
        case 'woff':
            header('Content-Type: font/woff');
            break;
        case 'woff2':
            header('Content-Type: font/woff2');
            break;
        case 'ttf':
            header('Content-Type: font/ttf');
            break;
        case 'eot':
            header('Content-Type: application/vnd.ms-fontobject');
            break;
        default:
            header('Content-Type: text/plain');
    }
    
    // Output the file
    readfile($requestUri);
    exit;
}

// If it's a directory, try index.htm in that directory
if (is_dir($requestUri)) {
    $indexFile = rtrim($requestUri, '/') . '/index.htm';
    if (file_exists($indexFile)) {
        header('Content-Type: text/html; charset=UTF-8');
        readfile($indexFile);
        exit;
    }
}

// File not found - return 404
http_response_code(404);
echo "404 - File not found: " . htmlspecialchars($requestUri);
?>
