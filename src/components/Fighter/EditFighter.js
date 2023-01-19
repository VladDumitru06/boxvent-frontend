import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FighterAPI from "../../apis/FighterAPI";
import ImageAPI from "../../apis/ImageAPI";

function EditFighter(props){
    const [fighterData, setFighterData] = useState({});
    const [imageData, setImageData] = useState();
    const [imgUrl, setImgUrl] = useState(null);
    useEffect(() => {
        setFighterData(() => ({
            fighterId: props.fighter.id,
            fighterName: null,
            wins: null,
            draws: null,
            loses: null,
            image: null
        }));
    }, []);

    useEffect(() => {
        async function fetchImage() {
            const response = await ImageAPI.getFighterImage(props);
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImgUrl(url);
            } else {
                console.error('Failed to fetch image');
            }
        }
        fetchImage();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImageData(reader.result);
            setImgUrl(reader.result);
        }
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        setFighterData((prevFighterData) => ({
            ...prevFighterData,
            image: imageData,
        }));
    }, [imageData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFighterData((prevFighterData) => ({
            ...prevFighterData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(fighterData.fighterName !== null || fighterData.wins !== null || fighterData.draws !== null || fighterData.loses !== null || fighterData.image !== undefined){
       const response = await FighterAPI.updateFighter(props.fighter.id,fighterData);
        if (response.status === 200) {
            props.modifyFighter(fighterData);
            props.setIsEdit(false);
            if(fighterData.image !== null){
                props.setImgUrl(imgUrl);
            }
            props.Notification.Success("Fighter updated successfully");
        } else {
            props.Notification.Error("Failed to update fighter");
            props.Notification.Error(response);
            console.log(response);
        }
    }else{
        props.Notification.Error("No changes made");
    }
    }

    return (
        <Form onSubmit={handleSubmit} className="text-light bg-dark p-3 rounded">
            <Form.Group controlId="formFighterName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    name="fighterName"
                    type="text"
                    onChange={handleChange}
                    placeholder={props.fighter.name} />
            </Form.Group>
            <Form.Group controlId="formWins">
                <Form.Label>Wins</Form.Label>
                <Form.Control
                    name="wins"
                    type="number"
                    onChange={handleChange}
                    step="1"
                    placeholder={props.fighter.boxingRecord.wins} />
            </Form.Group>
            <Form.Group controlId="formDraws">
                <Form.Label>Draws</Form.Label>
                <Form.Control
                    name="draws"
                    type="number"
                    onChange={handleChange}
                    step="1"
                    placeholder={props.fighter.boxingRecord.draws}  />
            </Form.Group>
            <Form.Group controlId="formLosses">
                <Form.Label>Loses</Form.Label>
                <Form.Control
                    name="loses"
                    type="number"
                    onChange={handleChange}
                    step="1"
                    placeholder={props.fighter.boxingRecord.loses} />
            </Form.Group>
            <Form.Group controlId="formImage">
            </Form.Group>
            <input  type="file" accept="image/jpeg,image/png" onChange={(e) => handleFileChange(e)} />
            <Form.Label className="pt-2 d-flex justify-content-center" >Image Preview</Form.Label>
            <Form.Group className="pb-2 d-flex justify-content-center" controlId="formImagePreview">
                <img  width={200} src={imgUrl} alt="Event" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default EditFighter;