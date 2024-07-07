import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { context } from "../../context/Context";

const Sidebar = () => {
  const [extend, setExtend] = useState(false);
  const { onSend, prevPrompts, setRecentPrompt, newChat } = useContext(context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSend(prompt);
  };
  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt=""
          onClick={() => setExtend((prev) => !prev)}
        />
        <div
          onClick={() => newChat()}
          className={`new-chat ${extend && "full"}`}
        >
          <img src={assets.plus_icon} alt="" />
          {extend && <p>New Chat</p>}
        </div>
        {extend && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, i) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  key={i}
                  className="recent-entry"
                >
                  <img src={assets.message_icon} alt="" />
                  <p>{item.length > 18 ? item.slice(0, 18) + "..." : item}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extend && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extend && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extend && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
