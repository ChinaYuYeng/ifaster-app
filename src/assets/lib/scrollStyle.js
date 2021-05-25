/**
 * 滚动条样式应用
 */
export default function applyStyleForScroll() {
  const style = document.createElement("style");
  style.innerHTML = `
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      
      ::-webkit-scrollbar-track {
        width: 6px;
        background: rgba(#101F1C, 0.1);
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
      }
      
      ::-webkit-scrollbar-thumb {
        background-color: rgba(#101F1C, 0.5);
        background-clip: padding-box;
        min-height: 28px;
        -webkit-border-radius: 2em;
        -moz-border-radius: 2em;
        border-radius: 2em;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(#101F1C, 1);
      }
    `;
  document.body.appendChild(style);
}