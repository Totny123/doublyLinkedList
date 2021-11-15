function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
  //内部类。只有DoublyLinkedList内部能实例化。
  function Node(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
  //因为需要用到内部类，所以设置原型方法也在内部设置。
  //append方法
  DoublyLinkedList.prototype.append = function (data) {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    } else {
      //单向链表需要找到最后一个节点再进行操作
      //头部开始查找
      // let current = this.head;
      //当next不为空，就把current指向next。循环结束后current就是最后的节点了。
      // while (current.next) {
      //   current = current.next;
      // }
      // current.next = newNode;
      // newNode.prev = current;
      // this.tail = newNode;
      // this.length++;

      //双向链表可以直接获取尾节点
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
      this.length++;
    }
  };
  //toString方法
  DoublyLinkedList.prototype.toString = function () {
    return this.backwardString();
  };
  //forwardString方法
  DoublyLinkedList.prototype.forwardString = function () {
    let current = this.tail;
    let resultArr = [];
    while (current) {
      resultArr.push(current.data);
      current = current.prev;
    }
    return resultArr.join(",");
  };
  //backwardString方法
  DoublyLinkedList.prototype.backwardString = function () {
    let current = this.head;
    let resultArr = [];
    while (current) {
      resultArr.push(current.data);
      current = current.next;
    }
    return resultArr.join(",");
  };
  //insert方法
  DoublyLinkedList.prototype.insert = function (position, data) {
    //下标越界判断
    if (position < 0 || position > this.length) {
      return false;
    }
    //创建节点
    const newNode = new Node(data);
    //是否为空的双向链表
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      //头插入
      if (position === 0) {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
        //尾插入
      } else if (position === this.length) {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
        //中间插入
      } else {
        let current;
        //根据下标距离头、尾的远近选择从哪里开始找current
        if (position < this.length / 2) {
          current = this.head;
          for (let i = 0; i < position; i++) {
            current = current.next;
          }
        } else {
          current = this.tail;
          for (let i = this.length - 1; i > position; i--) {
            current = current.prev;
          }
        }
        newNode.next = current;
        newNode.prev = current.prev;
        current.prev.next = newNode;
        current.prev = newNode;
      }
    }
    this.length++;
    return true;
  };
  //get方法
  DoublyLinkedList.prototype.get = function (position) {
    if (position < 0 || position >= this.length) {
      return null;
    } else {
      let current;
      if (position < this.length / 2) {
        console.log("头");
        current = this.head;
        for (let i = 0; i < position; i++) {
          current = current.next;
        }
      } else {
        console.log("尾");
        current = this.tail;
        for (let i = this.length - 1; i > position; i--) {
          current = current.prev;
        }
      }
      return current.data;
    }
  };
  //indexOf方法
  DoublyLinkedList.prototype.indexOf = function (data) {
    let current = this.head;
    let index = 0;
    while (index < this.length) {
      if (current.data === data) {
        return index;
      } else {
        current = current.next;
        index++;
      }
    }
    return -1;
  };
  //update方法
  DoublyLinkedList.prototype.update = function (position, data) {
    if (position < 0 || position >= this.length) {
      return false;
    }
    let current;
    if (position < this.length / 2) {
      let index = 0;
      current = this.head;
      while (index < position) {
        current = current.next;
        index++;
      }
    } else {
      let index = this.length - 1;
      current = this.tail;
      while (index > position) {
        current = current.prev;
        index--;
      }
    }
    current.data = data;
    return true;
  };
  //removeAt方法
  DoublyLinkedList.prototype.removeAt = function (position) {
    if (position < 0 || position >= this.length) {
      return null;
    } else {
      let current = this.head;
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
      } else if (position === 0) {
        this.head.next.prev = null;
        this.head = this.head.next;
      } else if (position === this.length - 1) {
        current = this.tail;
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
      } else {
        if (position < this.length / 2) {
          let index = 0;
          while (index < position) {
            current = current.next;
            index++;
          }
        } else {
          current = this.tail;
          let index = this.length - 1;
          while (index > position) {
            current = current.prev;
            index--;
          }
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }
      this.length--;
      return current.data;
    }
  };
  //remove方法
  DoublyLinkedList.prototype.remove = function (data) {
    let index = this.indexOf(data);
    return this.removeAt(index);
  };
  //size方法
  DoublyLinkedList.prototype.size = function () {
    return this.length;
  };
  //isEmpty方法
  DoublyLinkedList.prototype.isEmpty = function () {
    return this.length === 0;
  };
  //getHead方法
  DoublyLinkedList.prototype.getHead = function () {
    return this.head?.data;
  };
  //getTail方法
  DoublyLinkedList.prototype.getTail = function () {
    return this.tail?.data;
  };
}
