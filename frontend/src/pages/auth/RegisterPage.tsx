import RegisterForm from "../../components/RegisterForm";
import { Grid} from "@mui/material";

export default function LoginPage() {
    return (
        <Grid container justifyContent={'center'} alignItems={'center'} height="90vh" maxHeight={'100%'}>
            <RegisterForm />
        </Grid>
    );
}
