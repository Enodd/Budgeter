import { Grid } from "@mui/material";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
    return (
        <Grid container justifyContent={'center'} alignItems={'center'} height="90vh" maxHeight={'100%'}>
        <LoginForm />
      </Grid>
    );
}
