import 'package:app/views/home/chat/chat.dart';
import 'package:flutter/material.dart';
import 'mine/mine.dart';

class HomeMenu extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomeMenu> {
  int currentTab = 0;

  final List<Widget> children = [
    ChatPage(),
    MinePage(),
  ];

  final List<BottomNavigationBarItem> menus = [
    BottomNavigationBarItem(icon: Icon(Icons.message), label: '消息'),
    BottomNavigationBarItem(icon: Icon(Icons.person), label: '我的'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: children[currentTab],
      bottomNavigationBar: BottomNavigationBar(
        onTap: onTabTapped,
        currentIndex: currentTab,
        items: menus,
      ),
    );
  }

  void onTabTapped(int index) {
    setState(() {
      currentTab = index;
    });
  }
}
