import { useState, useEffect } from "react";
import { getUrls } from "../helpers/helpers";
import { IURLsStatus } from "../interfaces/IURLsStatus";
import { ISession } from "../pages";

interface IDashboardProps {
  userInfo: ISession;
}

export default function Dashboard(props: IDashboardProps) {
  const [urlStatus, setUrlStatus] = useState<IURLsStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getUrls(props.userInfo.id)
      .then((response) => {
        setIsLoading(false);
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        setUrlStatus(responseJson);
      })
      .catch((error) => {
        setUrlStatus([]);
      });
  }, []);

  function parseDate(date: string) {
    const newDate = new Date(date);
    return `${newDate.toLocaleTimeString()} - ${newDate.toLocaleDateString()}`;
  }

  return (
    <main className="text-left text-xs">
      <div className="w-full md:w-11/12 md:px-8 px-6">
        <table className="table w-full">
          <thead>
            <tr className="flex-1">
              <th className="align-top">Last Results</th>
              <th className="text-end">Loading time</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div className="flex w-full items-center justify-center m-8 mt-14 mr-24">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-700"></div>
              </div>
            ) : !urlStatus.length ? (
              <div className="p-6 text-2xl">
                Go to{" "}
                <img src="/static/images/newmonitor.svg" alt="New monitor" /> to
                register your first Monitoring Link!
              </div>
            ) : (
              urlStatus.map((item: IURLsStatus) => (
                <tr key={item.urlstatus_id} className="border-2 rounded-lg">
                  <td>
                    {item.url.replace("https://", "").replace("http://", "")}
                    <div>
                      <span>{parseDate(item.created_at)}</span>
                      <br />
                      <span>Status code: {item.status}</span>
                      <br />
                    </div>
                  </td>
                  <td className="align-top text-right">
                    <span>{item.load_time}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
