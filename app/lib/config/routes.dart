import 'package:app/views/chat-room/chat-room.dart';
import 'package:app/config/route_handlers.dart';
import 'package:app/views/home/index.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

class Routes {
  static void configureRoutes(FluroRouter router) {
    router.notFoundHandler = Handler(
        handlerFunc: (BuildContext context, Map<String, List<String>> params) {
      print("ROUTE WAS NOT FOUND !!!");
    });
    router.define('/', handler: globalHandler(HomeMenu()));
    router.define('/chat-room', handler: globalHandler(ChatRoomPage()));
  }
}
