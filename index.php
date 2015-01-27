<?php
require_once __DIR__ . 'vendor/autoload.php';

use Silex\Application;
use Silex\Provider\DoctrineServiceProvider;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

$app = new Application();
$app['debug'] = true;

$app->register(new DoctrineServiceProvider(), [
    'db.options' => [
        'driver' => 'pdo_sqlite',
        'path' => __DIR__ . '/app.db',
    ],
]);

$app->get('/todos', function (Request $request) use ($app) {
    if (($access = security($request)) instanceof JsonResponse) {
        return $access;
    }

    $sql = 'SELECT "id", "checked", "value" FROM todo WHERE "apikey" = "%s"';
    $todos = $app['db']->fetchAll(sprintf($sql, $access));

    return $app->json($todos, 200);
});

$app->post('/todo', function (Request $request) use ($app) {
    if (($access = security($request)) instanceof JsonResponse) {
        return $access;
    }

    $data = json_decode($request->getContent(), true);
    $insert = 'INSERT INTO todo ("apikey", "checked", "value") VALUES ("%s", %d, "%s")';
    $update = 'UPDATE todo SET "checked" = "%d", "value" = "%s" WHERE "id" = %d AND "apikey" = "%s"';


    foreach ($data as $todo) {
        $query =
            array_key_exists('id', $todo) ?
            sprintf($update, $todo['checked'], $todo['todo'], $todo['id'], $access) :
            sprintf($insert, $access, $todo['checked'], $todo['todo'])
        ;
        $app['db']->query($query);
    }

    return $app->redirect("/index.php/todos");
});

$app->delete("/todo", function (Request $request) use ($app) {
    if (($access = security($request)) instanceof JsonResponse) {
        return $access;
    }

    $data = json_decode($request->getContent(), true);
    $toRemove = [];
    foreach ($data as $todo) {
        if (
            !array_key_exists('id', $todo)
            && $app['db']->query(sprintf('SELECT * FROM todo WHERE "apikey" = %s AND "id" = %d', $access, $todo['id']))
        ) {
            return $app->json(['message' => 'No id in the todo'], 404);
        }
        $toRemove[] = $todo['id'];
    }

    $sql = 'DELETE FROM todo WHERE "apikey" = %s AND "id" IN (%s)';
    $app['db']->query(sprintf($sql, $access, implode(',', $toRemove)));

    return $app->json(['message' => 'Ok']);
});

$app->post('/db/install', function () use ($app) {
    $app['db']->exec('DROP TABLE IF EXISTS todo');
    $app['db']->exec('CREATE TABLE todo ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "apikey" VARCHAR(255), "checked" BOOLEAN, "value" VARCHAR(255))');

    return $app->json(['message' => 'Ok'], 201);
});

function security(Request $request)
{
    if (!$request->headers->get('apikey')) {
        return $app->json('bad headers', 403);
    }

    return $request->headers->get('apikey');
}

$app->run();
