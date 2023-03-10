import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import EventAPI from "../../apis/EventAPI";
import QRCode from "react-qr-code";
import ImageAPI from "../../apis/ImageAPI";
function TicketCard(props) {
    const [event, setEvent] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchImage() {
            setIsLoading(true);
            const response = await ImageAPI.getEventImage(props);
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImgUrl(url);
            } else {
                setImgUrl(`${process.env.PUBLIC_URL}/assets/NoImg.png}`)
                console.error('Failed to fetch image');
            }
            setIsLoading(false);
        }
        fetchImage();
    }, []);

    useEffect(() => {
        if (event) {
            console.log(JSON.stringify(event));
        }
    }, []);
    console.log(JSON.stringify(props.event));

    return (
        <Card>
            <Card.Body>
                <Card.Img variant="top" src={isLoading ? `${process.env.PUBLIC_URL}/assets/Loading.gif` : imgUrl}/>
                <Card.Title>{props.event.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.event.description}</Card.Subtitle>
                <Card.Text>
                    {props.event.date.slice(0,10)}
                    <br/>
                    {props.event.date.slice(11,24)}</Card.Text>
                <Card.Text>
                    Scan for entry:
                    <QRCode size={100} key={props.ticket.id} value={String(props.ticket.id)} />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default TicketCard;