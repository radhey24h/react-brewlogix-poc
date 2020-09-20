import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Select, FormControl, InputLabel, MenuItem, FormGroup, FormLabel } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch } from 'react-redux';
import { addProduct, getProducts, deleteProduct, updateProduct } from '../actions'
import Header from '../Components/Header';
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    CircularProgress,
    Divider
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const options = [
    "a test1",
    "a test2",
    "b test3",
    "c test4",
    "d test5",
    "e test6",
    "f test7",
    "g test8",
    "e test9",
    "h test10",
];
let suggestions = [];
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        marginLeft: 110,
        marginTop: 50,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
    },
    typography: {
        backgroundColor: "#fff",
        padding: theme.spacing(1),
    },
    formControl: {
        minWidth: 120,
        paddingLeft: 5
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    itemSelected: {
        cursor: 'pointer'
    }
}));

export default function BrewMenu() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [notes, setNotes] = useState('');
    const [draft, setDraft] = useState(false);
    const [packages, setPackages] = useState(false);
    const [glassware, setGlassware] = useState('');
    const [productType, setProductType] = useState('');
    const [productName, setProductName] = useState('');
    const [braveryName, setBraveryName] = useState('');
    const [state, setState] = useState('');
    const [style, setStyle] = useState('');
    const [abv, setABV] = useState('');
    const [srm, setSRM] = useState('');
    const [showProgress, setShowProgress] = useState(false);
    const [showResults, setShowResults] = useState(true);
    const [productList, setProducts] = useState([]);

    useEffect(() => {
        setProducts(dispatch(getProducts()).payload);
    }, [])

    function EditProduct(product) {
        alert('Work under process...!!!')
        //dispatch(updateProduct(product))
    }

    function DeleteProduct(id) {
        dispatch(deleteProduct(id))
        setProducts(dispatch(getProducts()).payload);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setShowProgress(true);

        const product = {
            id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
            productType,
            productName,
            braveryName,
            state,
            abv,
            srm,
            notes,
            draft,
            packages,
            glassware
        }

        dispatch(addProduct(product));
        setProducts(dispatch(getProducts()).payload);
        setShowProgress(false);
    }

    function onProductChanged(e) {
        const value = e;
        if (value.length > 0) {
            const regx = new RegExp(`^${value}`, 'i');
            suggestions = options.sort().filter(x => regx.test(x));
        }
        setProductName(e);
        setShowResults(true);
    }

    function suggestionSelected(e) {
        setProductName(e);
        setShowResults(false);
    }

    function RenderSuggestions() {
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li className={classes.itemSelected} value={item} onClick={() => suggestionSelected(item)}>{item}</li>)}
            </ul>
        );

    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header />
            <main className={classes.content}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant="h5" className={classes.typography}>
                            Best beer bar
                        </Typography>
                    </Grid>
                    <Box width="100%" display="flex" flexDirection="row" alignItems="stretch" padding={1}>
                        <Box width="55%" boxShadow='2' borderRadius='8px' p='24px'>
                            <form onSubmit={handleSubmit}>
                                <Typography>Add a Product</Typography>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
                                    <Select
                                        value={productType}
                                        onChange={(e) => setProductType(e.target.value)}>
                                        <MenuItem value="Beer">Beer</MenuItem>
                                        <MenuItem value="Kombucha">Kombucha</MenuItem>
                                        <MenuItem value="Coffee">Coffee</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>

                                <div>
                                    <TextField required id="product-required" label="Product Name" name="productName" value={productName} onChange={(e) => onProductChanged(e.target.value)} />
                                    {showResults ? <RenderSuggestions /> : null}
                                    {/*  <TextField required id="product-required" label="Product Name" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} /> */}
                                    <TextField className={classes.formControl} required id="bravery-required" label="Bravery Name" name="braveryName" value={braveryName} onChange={(e) => setBraveryName(e.target.value)} />
                                </div>

                                <div>
                                    <TextField required id="standard-required" label="City" />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="state-select-label">State</InputLabel>
                                        <Select
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}>
                                            <MenuItem value="one">California</MenuItem>
                                            <MenuItem value="two">Albama</MenuItem>
                                            <MenuItem value="three">Newyork</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    </FormControl>

                                </div>

                                <div>
                                    <TextField required id="style-required" label="Style" name="style" value={style} onChange={(e) => setStyle(e.target.value)} />
                                    <TextField className={classes.formControl} required id="ABV-required" label="ABV" name="abv" value={abv} onChange={(e) => setABV(e.target.value)} />
                                    <TextField className={classes.formControl} required id="SRM-required" label="SRM" name="srm" value={srm} onChange={(e) => setSRM(e.target.value)} />
                                </div>

                                <div>
                                    <TextField required id="price-required" label="Price" />
                                    <TextField className={classes.formControl} required id="servingSize-required" label="Serving Size" />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="glassware">Glassware</InputLabel>
                                        <Select
                                            value={glassware}
                                            onChange={(e) => setGlassware(e.target.value)}>
                                            <MenuItem value="one">One</MenuItem>
                                            <MenuItem value="two">Two</MenuItem>
                                            <MenuItem value="three">Three</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <FormControlLabel
                                    control={
                                        <Button style={{ textDecoration: 'none', }} >+</Button>
                                    }
                                    label="Add Another"
                                />

                                <FormGroup>
                                    <FormLabel component="legend">Serving Type</FormLabel>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={draft}
                                                onChange={(e) => setDraft(e.target.value)}
                                                name="draft"
                                                color="primary"
                                            />
                                        }
                                        label="Draft"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                value={packages}
                                                onChange={(e) => setPackages(e.target.value)}
                                                name="packages"
                                                color="primary"
                                            />
                                        }
                                        label="Package"
                                    />

                                </FormGroup>

                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="Notes"
                                    label="Notes"
                                    placeholder="Notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    helperText="Hint:Describe the product test."
                                />
                                {showProgress ?
                                    <CircularProgress size={24} thickness={4} />
                                    : null}<br />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Add
                                </Button>
                            </form>
                        </Box>
                        <Box width="2%">
                            <Divider orientation="vertical" flexItem />
                        </Box>
                        <Box width="43%">
                            <TableContainer component={Paper}>
                                <Table className={classes.table} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell align="right">Bravery</TableCell>
                                            <TableCell align="right">Edit</TableCell>
                                            <TableCell align="right">Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {productList.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {row.productName}
                                                </TableCell>
                                                <TableCell align="right">{row.braveryName}</TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        onClick={EditProduct}>
                                                        <EditIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        onClick={() => DeleteProduct(row.id)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>
                    </Box>
                </Grid>
            </main>
        </div>
    );
}
