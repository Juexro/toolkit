import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

Handler globalHandler(Widget widget) {
  return Handler(
      handlerFunc: (BuildContext context, Map<String, List<String>> params) {
    return widget;
  });
}
