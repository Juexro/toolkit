import 'package:app/config/application.dart';
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';

class ChatPage extends StatefulWidget {
  @override
  _ChatPageState createState() => _ChatPageState();
}

enum AppBarAction { add, scan }

class _ChatPageState extends State<ChatPage> {
  final List<String> entries = <String>['1', '2', '3'];
  final List<int> colorCodes = <int>[600, 500, 100];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('消息'),
          actions: [
            PopupMenuButton<AppBarAction>(
                icon: Icon(Icons.add_circle_outline_rounded),
                offset: Offset(10, 50),
                itemBuilder: (BuildContext context) =>
                    <PopupMenuEntry<AppBarAction>>[
                      PopupMenuItem(
                        child: Container(
                          padding: EdgeInsets.only(left: 10, right: 10),
                          child: Row(
                            children: [
                              Container(
                                margin: EdgeInsets.only(right: 10),
                                child: Icon(
                                  Icons.add,
                                  color: Colors.grey[500],
                                ),
                              ),
                              Text(
                                '添加群',
                                style: TextStyle(fontSize: 16),
                              )
                            ],
                          ),
                        ),
                        value: AppBarAction.add,
                      ),
                      PopupMenuItem(
                        child: Container(
                          padding: EdgeInsets.only(left: 10, right: 10),
                          child: Row(
                            children: [
                              Container(
                                margin: EdgeInsets.only(right: 10),
                                child: Icon(
                                  Icons.qr_code_sharp,
                                  color: Colors.grey[500],
                                ),
                              ),
                              Text(
                                '扫一扫',
                                style: TextStyle(fontSize: 16),
                              )
                            ],
                          ),
                        ),
                        value: AppBarAction.scan,
                      )
                    ]),
          ],
        ),
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
                Application.router.navigateTo(context, '/chat-room',
                    transition: TransitionType.cupertino)
              },
            );
          },
          separatorBuilder: (BuildContext context, int index) =>
              const Divider(),
        ));
  }
}
