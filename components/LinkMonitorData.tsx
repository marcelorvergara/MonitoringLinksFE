import { useState } from "react";
import { ISession } from "../pages";

interface ILinkMonitorDataProps {
  userInfo: ISession;
}

interface IFeedback {
  [field: string]: string;
}

export default function LinkMonitorData(props: ILinkMonitorDataProps) {
  const [url, setUrl] = useState<string>("");
  const [feedback, setFeedback] = useState<IFeedback>({});
  function handleUrlValue(event: React.FormEvent<HTMLInputElement>) {
    setUrl(event.currentTarget.value);
  }

  async function registerUrl() {
    try {
      const resp = await fetch(process.env.NEXT_PUBLIC_BACKEND_SRV + "/urls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, user_id: props.userInfo.id }),
      });
      if (resp.status === 200) {
        const respJson = await resp.json();
        setFeedback(respJson);
      }
    } catch (err) {
      setFeedback({ error: "Invalid URL or firewall block rule" });
    }
  }

  return (
    <form className="w-full max-w-lg text-left">
      <div className="flex flex-wrap">
        <div className="w-full md:px-8 m-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name">
            Enter a URL to monitor:
          </label>
          <input
            onChange={handleUrlValue}
            value={url}
            className="appearance-none block text-xs w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="http://www.google.com"
          />
        </div>
      </div>
      <div className="text-right mx-4">
        <button
          onClick={registerUrl}
          className="text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow">
          Go
        </button>
      </div>
      {feedback.error ? (
        <div role="alert" className="text-sm mt-4 p-2">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Registration not completed
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{feedback.error}</p>
          </div>
        </div>
      ) : parseInt(feedback.status) === 200 ? (
        <div role="alert" className="text-sm mt-4 p-2">
          <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
            Success
          </div>
          <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
            <p>{url} registred. </p>
          </div>
        </div>
      ) : null}
    </form>
  );
}
