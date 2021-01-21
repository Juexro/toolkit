import 'package:app/config/application.dart';
import 'package:app/config/routes.dart';
import 'package:flutter/material.dart';
import 'package:fluro/fluro.dart';

void main() {
  final router = FluroRouter();
  Routes.configureRoutes(router);
  Application.router = router;
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      onGenerateRoute: Application.router.generator,
      initialRoute: '/home/1',
    );
  }
}
