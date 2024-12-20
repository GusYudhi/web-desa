interface ContentProps {
  page?: string;
  children: React.ReactNode;
  nomx?: boolean;
}

const Content: React.FC<ContentProps> = ({ ...props }) => {
  return (
    <div className="nk-content">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            {!props.page ? props.children : null}
            {props.page === "component" ? (
              <div
                className={`components-preview wide-md ${
                  !props.nomx ? "mx-auto" : ""
                }`}
              >
                {props.children}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
