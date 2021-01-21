import 'package:app/config/application.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

class ChatPage extends StatefulWidget {
  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  final List<String> entries = <String>['1', '2', '3'];
  final List<int> colorCodes = <int>[600, 500, 100];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: ListView.separated(
      padding: const EdgeInsets.all(8),
      itemCount: entries.length,
      itemBuilder: (BuildContext context, int index) {
        return InkWell(
          child: Container(
            height: 50,
            color: Colors.amber[colorCodes[index]],
            child: Center(child: Text('群聊 ${entries[index]}')),
          ),
          onTap: () => {
            Application.router.navigateTo(context, '/chat-room', transition: TransitionType.cupertino)
          },
        );
      },
      separatorBuilder: (BuildContext context, int index) => const Divider(),
    ));
  }
}
