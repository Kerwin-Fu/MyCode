var that;
class Tab {

    constructor(id) {
        that = this;
        // 获取DOM元素
        this.tab = document.querySelector(id);
        this.addBtn = this.tab.querySelector('.tabadd')
        this.ul = this.tab.querySelector('.firstnav ul:first-child');
        // section 父元素
        this.fsection = this.tab.querySelector('.tabscon');
        this.init()
    }

    // 注册点击事件
    init() {
        this.updateNode();
        this.addBtn.onclick = this.DoAdd;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.DoToggle;
            this.remove[i].onclick = this.DoRemove;
            this.spans[i].ondblclick = this.DoEdit;
            this.sections[i].ondblclick = this.DoEdit;

        }
    }
    //更新
    updateNode() {
        this.lis = this.tab.querySelectorAll('li');
        this.sections = this.tab.querySelectorAll('section');
        this.remove = this.tab.querySelectorAll('.icon-guanbi')
        this.spans = this.tab.querySelectorAll('.firstnav li span:first-child')
    }                                           

    //清除样式
    DoClear() {
        for (var i = 0; i < that.lis.length; i++) {
            that.lis[i].className = '';
            that.sections[i].className = '';
        }
    }
    //切换
    DoToggle() {
        that.DoClear();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }

    //增加
    DoAdd() {
        that.DoClear();
        var random = Math.random();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试 ' + random + '</section>';
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }

    // 删除
    DoRemove(e) {
        //阻止冒泡
        e.stopPropagation();
        //获取索引号
        var index = this.parentNode.index;
        //删除相同索引号的lis和section
        that.lis[index].remove();
        that.sections[index].remove();
        //更新页面
        that.init();
        if (document.querySelector('.liactive')) return;
        index--
        that.lis[index] && that.lis[index].click()
        
    }

    编辑
    DoEdit() {
        var str = this.innerHTML
        //阻止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />'
        var input = this.children[0];
        input.value = str;
        input.select();
        input.onblur = function() {
            this.parentNode.innerHTML = input.value
        }

        input.onkeyup =function(e) {
            if (e.keyCode === 13) input.blur();
        }

    }







}

new Tab('#tab')