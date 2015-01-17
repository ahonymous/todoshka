<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\DoctrineServiceProvider(), [
    'db.options' => [
        'driver' => 'pdo_sqlite',
        'path' => __DIR__ . '/app.db',
    ],
]);

$app->get('/todos', function () use ($app) {
    $sql = 'SELECT * FROM todo';
    $todos = $app['db']->fetchAll($sql);

    return $app->json($todos, 200);
});

$app->post('/todo', function (Request $request) use ($app) {
    $sql = 'INSERT INTO todo (checked, todo) VALUES ("%d", "%s")';
    $sql = sprintf($sql, $request->get('checked'), $request->get('todo'));
    $app['db']->query($sql);

    return $app->json(['message' => 'Ok', 'sql' => $sql]);
});

$app->post('/db/clean', function () use ($app) {
    $app['db']->exec('DROP TABLE IF EXISTS todo');
    $app['db']->exec('CREATE TABLE todo (`checked` BOOLEAN, `todo` VARCHAR(255))');

    return $app->json(['message' => 'Ok'], 201);
});

$app->run();
