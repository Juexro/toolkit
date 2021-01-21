import 'package:flutter/material.dart';

class ChatRoomPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    // String msg = ModalRoute.of(context).settings.arguments as String;

    return Scaffold(
        appBar: AppBar(
          title: Text('群聊'),
        ),
        body: Center(
          child: Column(children: [
            Text('群聊')
            // Text('from first screen: ' + msg, style: TextStyle(fontSize: 20)),
            // RaisedButton(
            //     child: Text('首页'),
            //     onPressed: () => Navigator.pop(context, "from second page"))
          ]),
        ));
  }
}