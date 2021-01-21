import 'package:app/config/application.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

class MinePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // String msg = ModalRoute.of(context).settings.arguments as String;

    return Scaffold(
        appBar: AppBar(
      title: Text('我的'),
    ));
  }
}
