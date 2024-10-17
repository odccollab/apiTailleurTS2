const NotificationItem = ({ img, name, time, message }) => (
    <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
        <img src={img} alt="user" className="w40 position-absolute left-0" />
        <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
            {name} <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">{time}</span>
        </h5>
        <h6 className="text-grey-500 fw-500 font-xssss lh-4">{message}</h6>
    </div>
);

export default NotificationItem;
