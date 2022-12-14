import { ISession } from "../pages";
import Table from "./Table";

interface IMainDefaultProps {
  userInfo?: ISession;
  totUrls?: number;
}
export default function MainDefault(props: IMainDefaultProps) {
  return (
    <main className="flex flex-col items-center justify-center text-center mt-4">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-600">
        Welcome to <br />
        <span className="text-slate-800">Monitoring Links</span>
      </h1>
      {!props.userInfo ? (
        <>
          <h2 className="text-sm mt-4 mb-2 font-body mx-2">
            Check out this! Here you can monitor your website with just a few
            clicks. Try it now and you even can benchmark with other sites how
            is your service performing.
          </h2>
          <div className="p-2 ml-2 mr-1 mt-4 text-left border-2 border-gray-700 rounded transition-colors duration-150 ease-in sm:w-11/12">
            <h3 className="text-md text-sm mb-2">Login</h3>
            <p className="flex items-start gap-2 text-xs">
              <img
                className="bg-gray-400 p-1 rounded h-12 w-12"
                src="/static/images/login.svg"
                alt="how to use Monitoring Links"
              />
              Click in the face icon in the side menu to login
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="m-2 basis-11/12 p-2 text-center font-body transition-colors duration-150 ease-in">
            <h3 className="text-md text-sm mb-2">
              Hello{" "}
              {`${
                !!props.userInfo.displayName
                  ? props.userInfo.displayName
                  : props.userInfo.name
              }`}
              . You have{" "}
              {`${
                props.totUrls === 1
                  ? `${props.totUrls} link`
                  : `${props.totUrls} links`
              }`}{" "}
              being monitored.
            </h3>
          </div>
          <Table userInfo={props.userInfo!} />
        </>
      )}
      <div className="p-2 ml-2 mr-1 mt-4 text-left border-2 border-gray-700 rounded transition-colors duration-150 ease-in sm:w-11/12">
        <h3 className="text-md text-sm mb-2">Documentation</h3>
        <p className="flex items-start gap-2 text-xs">
          <img
            className="bg-gray-400 p-1 rounded h-12 w-12"
            src="/static/images/howto.svg"
            alt="how to use Monitoring Links"
          />
          After login, find information about how to use Monitoring Links
          clicking in the question mark in the side menu
        </p>
      </div>
    </main>
  );
}
