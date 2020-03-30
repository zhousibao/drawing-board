import vue from 'vue';

// 这里就是我们刚刚创建的那个静态组件
import messageComponent from './message.vue';

// 返回一个 扩展实例构造器
const MessageConstructor = vue.extend(messageComponent);

function Message({ message }) {
  // 实例化一个 toast.vue
  const MessageDom = new MessageConstructor({
    el: document.createElement('div'),
    data() {
      return {
        message,
        open: true, // 是否显示组件
      };
    },
  });
  document.body.appendChild(MessageDom.$el);
}


/** *
 * Message组件
 *
 * message: 内容
 *
 */
export default Message;
