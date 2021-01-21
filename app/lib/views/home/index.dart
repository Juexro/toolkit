import 'package:flutter/material.dart';
import 'mine/mine.dart';

class HomeMenu extends StatefulWidget {
  HomeMenu({this.currentTab});
  final int currentTab;

  @override
  _HomePageState createState() => _HomePageState(currentTab: currentTab);
}

class _HomePageState extends State<HomeMenu> {
  _HomePageState({@required this.currentTab});
  int currentTab = 0;
  final List<Widget> children = [
    Text('首页'),
    MinePage(),
  ];

  final List<BottomNavigationBarItem> menus = [
    BottomNavigationBarItem(icon: Icon(Icons.home), label: '首页'),
    BottomNavigationBarItem(icon: Icon(Icons.person), label: '我的'),
  ];

  @override
  Widget build(BuildContext context) {
    print(currentTab);
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
