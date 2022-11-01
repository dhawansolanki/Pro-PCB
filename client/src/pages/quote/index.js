import React from 'react'
import ReactS3Client from 'react'
import setFormValues from 'react'
import { Helmet } from 'react-helmet'
import { GerberViewer } from "../../gerber_viewer/lib";
import HeaderOne from '../../wrappers/header/HeaderOne';
import HeaderTwo from '../../wrappers/header/HeaderTwo';
// import HeaderThree from '../../wrappers/header/HeaderThree';
import HeaderFour from '../../wrappers/header/HeaderFour';
import HeaderFive from '../../wrappers/header/HeaderFive';
import HeaderSix from '../../wrappers/header/HeaderSix';

import './quote.css'
import './quote_responsive.css'

import PropTypes from "prop-types";
import { Fragment, useContext } from "react";
// import { useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import LocationMap from "../../components/contact/LocationMap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as price from "../../data/price.json";
import axios from "axios";
// import { UserContext } from "../../App";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { useToasts } from "react-toast-notifications";
import S3 from "react-aws-s3";
import { useAsyncDeepState } from "use-async-effect2";
import { useEffect } from "react";
import HeaderThree from '../../wrappers/header/HeaderThree';



const Quote = (props) => {
  let total=0;
  let cost_basematerial=0;
  let layer="";
  let cost_gold_fingers=100;
  let cost_castellated_holes=100;
  let cost_confirm_production_file=100;
  let cost_remove_order_number=100;
  let cost_layers=200;
  let cost_pcb_quantity=100;
  let cost_outer_copper_weight=100;
  let cost_drop_design=100;
  let cost_color=0;
  let cost_flying_probe_test=100;
  let cost_pcb_thickness=100;
  let cost_delivery_format=0;
  let cost_silkscreen=0;
  let cost_surface_finish=0;

  let [basematerial, setbasematerial] = React.useState('');
  const [color, setcolor] = React.useState('');
  const [delivery_format, setdelivery_format] = React.useState('');
  const [silkscreen, setsilkscreen] = React.useState('');
  const [surface_finish, setsurface_finish] = React.useState('');
  const [flying_probe_test, setflying_probe_test] = React.useState('fullytest');
  const [pcb_thickness, setpcb_thickness] = React.useState('0.4');
  const [drop_design, setdrop_design] = React.useState('1');
  const [pcb_quantity, setpcb_quantity] = React.useState("5");
  const [gold_fingers, setgold_fingers] = React.useState(true);
  const [castellated_holes, setcastellated_holes] = React.useState(true);
  const [confirm_production_file, setconfirm_production_file] = React.useState(true);
  const [remove_order_number, setremove_order_number] = React.useState(true);
  const [layers, setlayers] = React.useState(true);
  const [outer_copper_weight,setouter_copper_weight] = React.useState("1oz");
  const [dimension_width, setdimension_width] = React.useState("");
  const [dimension_height, setdimension_height] = React.useState("");
  const [dimension_unit, setdimension_unit] = React.useState("mm");

  if(layers==true){
    layer = 2;
  }else{
    layer = 1;
  }


  const handleChange_basematerial = (event) => {
    // console.log(basematerial)
    setbasematerial(event.target.value)  
    // console.log("Base Material : ",basematerial);

  }

 
  
  const handleChange_color = (event) =>{
    setcolor(event.target.value)
    console.log("Color by dhawan : ",color);
    axios.post('http://localhost:8080/cart/',{
      pcb_color:color
    });
  }

  const handleChange_delivery_format = (event)=>{
    setdelivery_format(event.target.value);
    // console.log("Delivery : ", delivery_format);
  }

  const handleChange_silkscreen = (event)=>{
    setsilkscreen(event.target.value);
    // console.log("Silk : ", silkscreen);
  }

  const handleChange_surface_finish = (event)=>{
    setsurface_finish(event.target.value);
    // console.log("Surface : ",surface_finish);
  }

  const handleChange_flying_probe_test = (event)=>{
    setflying_probe_test(event.target.value);
  }

  const handleChange_pcb_thickness = (event)=>{
    setpcb_thickness(event.target.value);
  }

  const handleChange_drop_design = (event)=>{
    setdrop_design(event.target.value);
  }
  const handleChange_pcb_quantity = (event)=>{
    setpcb_quantity(event.target.value);
  }

  const handleChange_outer_copper_weight = (event)=>{
    setouter_copper_weight(event.target.value);
  }

  const handleChange_dimension_width = (event)=>{
    setdimension_width(event.target.value);
  }

  const handleChange_dimension_height = (event)=>{
    setdimension_height(event.target.value);
  }

  const handleChange_dimension_unit = (event)=>{
    setdimension_unit(event.target.value);
  }
  
  //COST OF EACH MATERIALS

  if(basematerial==="fr4"){
    cost_basematerial=100;  
  }if(basematerial==="aluminium"){
    cost_basematerial=200;
  }

  if(gold_fingers===true){
    cost_gold_fingers=100;
  }else{
    cost_gold_fingers=0;
  }

  if(castellated_holes===true){
    cost_castellated_holes=100;
  }else{
    cost_castellated_holes=0;
  }

  if(confirm_production_file===true){
    cost_confirm_production_file=100;
  }else{
    cost_confirm_production_file=0;
  }

  if(remove_order_number===true){
    cost_remove_order_number=100;
  }else{
    cost_remove_order_number=0;
  }

  if(layers===true){
    cost_layers=200;
  }else{
    cost_layers=100;
  }

  if(pcb_quantity==="5"){
    cost_pcb_quantity=100;
  }else if(pcb_quantity==="10"){
    cost_pcb_quantity=200;
  }else if(pcb_quantity==="15"){
    cost_pcb_quantity=300;
  }else if(pcb_quantity==="20"){
    cost_pcb_quantity=400;
  }else if(pcb_quantity==="25"){
    cost_pcb_quantity=500;
  }else if(pcb_quantity==="30"){
    cost_pcb_quantity=600;
  }else if(pcb_quantity==="50"){
    cost_pcb_quantity=700;
  }else if(pcb_quantity==="75"){
    cost_pcb_quantity=800;
  }else if(pcb_quantity==="100"){
    cost_pcb_quantity=900;
  }else if(pcb_quantity==="125"){
    cost_pcb_quantity=1000;
  }else if(pcb_quantity==="150"){
    cost_pcb_quantity=1100;
  }

  if(outer_copper_weight==="1oz"){
    cost_outer_copper_weight=100;
  }else{
    cost_outer_copper_weight=200;
  }

  if(drop_design==="1"){
    cost_drop_design=100;
  }

  if(color=="blue"){
    cost_color=100;
  }else if(color=="green"){
    cost_color=100;
  }else if(color=="yellow"){
    cost_color=100;
  }else if(color=="red"){
    cost_color=100;
  }else if(color=="black"){
    cost_color=100;
  }

  if(flying_probe_test==="fullytest"){
    cost_flying_probe_test=100;
  }else if(flying_probe_test==="notest"){
    cost_flying_probe_test=0;
  }

  if(pcb_thickness==="0.4"){
    cost_pcb_thickness=100;
  }else if(pcb_thickness==="0.6"){
    cost_pcb_thickness=200;
  }else if(pcb_thickness==="0.8"){
    cost_pcb_thickness=300;
  }else if(pcb_thickness==="1.0"){
    cost_pcb_thickness=400;
  }else if(pcb_thickness==="1.2"){
    cost_pcb_thickness=500;
  }else if(pcb_thickness==="1.6"){
    cost_pcb_thickness=600;
  }else if(pcb_thickness==="2.0"){
    cost_pcb_thickness=700;
  }

  if(delivery_format==="singlepcb"){
    cost_delivery_format=100;
  }else if(delivery_format==="panelbycustomer"){
    cost_delivery_format=200;
  }else if(delivery_format==="panelbypropcb"){
    cost_delivery_format=300;
  }

  if(silkscreen==="silver"){
    cost_silkscreen=100;
  }else if(silkscreen==="black"){
    cost_silkscreen=200;
  }

  if(surface_finish==="HASL"){
    cost_surface_finish=100;
  }else if(surface_finish==="HASL-RoHS"){
    cost_surface_finish=200;
  }else if(surface_finish==="ENIG-RoHS"){
    cost_surface_finish=300;
  }
  // --------------------------------------

  const addToCart=()=>{
    console.log("Button is Clicked")
  }

  let history = useHistory();
  const { addToast } = useToasts();
  const cookies = new Cookies();
  const email = cookies.get("Email") || null;
  
  console.log(email);
  if(email==null){
    // alert("Please Login First");
    // window.location.href = "./login-register";
  }
  // const { pathname } = location;
  const [formValues, setFormValues] = useAsyncDeepState({
    Base_material: "FR-4",
    Layers: 2,
    dimensionwidth: 100,
    dimensionheight: 100,
    Dimensions: "mm",
    Quantity: 5,
    product_type: "Industrial/Commercial electronic",
    Different_Design: 1,
    delivery_format: "singlepcb",
    pcb_thickness: 1.6,
    pcb_color: "green",
    silkscreen: "white",
    surface_finish: "HASL(with lead)",
    outercopperweight: "1oz",
    goldfingers: "No",
    ConfirmProductionFile: "No",
    flyingProbeTest: "fullytest",
    castellatedHoles: "No",
    RemoveOrderNumber: "No",
    email: "",
    total: 0,
    filelocation: "",
  });

  const config = {
    bucketName: "propcb",
    region: "ap-south-1",
    accessKeyId: "AKIA2VK5A5XIBKNO6KWE",
    secretAccessKey: "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"};
  const ReactS3Client = new S3(config);
  const handleFileChange = (e) => {
    ReactS3Client.uploadFile(e.target.files[0], e.target.files[0].name)
      .then((data) => {
        setFormValues(({ state }) => ({
          ...state,
          filelocation: data.location,
        }));
      })
      .catch((err) => console.error(err));
  };
  
  //Total Cost
  total=cost_basematerial+
  cost_gold_fingers+
  cost_castellated_holes+
  cost_confirm_production_file+
  cost_remove_order_number+
  cost_layers+
  cost_pcb_quantity+
  cost_outer_copper_weight+
  cost_drop_design+
  cost_color+
  cost_flying_probe_test+
  cost_pcb_thickness+
  cost_delivery_format+
  cost_silkscreen+
  cost_surface_finish;

  return (<>
      <HeaderOne/>
    <div className="quote-container">
    
      <Helmet>
        <title>ProPCB | Quote</title>
      </Helmet>

        
           
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">  
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                     <GerberViewer/>  
                        </div>
         
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

      <div className="quote-quote">
        <div className="quote-your-loan">
          <div className="quote-banner2">
            <img
              alt="IMAGE23812removebgpreview12233"
              src="/playground_assets/image23812removebgpreview12233-7x97-500w.png"
              className="quote-i-m-a-g-e23812removebgpreview1"
            />


            <div className="quote-frame220">

            </div>
          </div>
          <div className="quote-topbar"></div>
          <div className="quote-group1000001707">
            <div className="quote-group1000001700">
              <select value={pcb_thickness} onChange={handleChange_pcb_thickness} defaultValue={pcb_thickness} className="pcbthickness1">
                <option value="0.4">0.4</option>
                <option value="0.6">0.6</option>
                <option value="0.8">0.8</option>
                <option value="1.0">1.0</option>
                <option value="1.2">1.2</option>
                <option value="1.6">1.6</option>
                <option value="2.0">2.0</option>
              </select>
             
             
            </div>
            <span className="quote-text002">
              <span>PCB Thickness</span>
            </span>
          </div>
          <div className="quote-group1000001706">
            <div className="quote-group10000017061">
              <div className="quote-group18922">
                <span className="quote-text004">
                  <span>Layers</span>
                  
                </span>
                <div className="quote-group1000001694">
                <div class="toggle-button-cover">
      {/* <div class="button-cover"> */}
        <div class="button b2" id="button-18">
        <input value={layers} defaultChecked={layers} onChange={()=>setlayers(!layers)}  type="checkbox" className='checkbox1'/>
          <div class="knobs">
            <span></span>
          </div>
          <div class="layer"></div>
        </div>
      </div>
    {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="quote-group1000001705">
            <div className="quote-group1000001702">
              
              <select value={pcb_quantity} onChange={handleChange_pcb_quantity} defaultValue={pcb_quantity} className="pcbquantity1">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
                <option value="125">125</option>
                <option value="150">150</option>
              </select>
              
              
            </div>
            <span className="quote-text010">
              <span>PCB Quantity</span>
            </span>
          </div>
          <div className="quote-group1000001701">
            <div className="quote-group10000017001">
              
              <select value={drop_design} onChange={handleChange_drop_design} defaultValue={drop_design} className="droptest1">
                <option value="1">1</option>
                
              </select>
              
            </div>
            <span className="quote-text013">
              <span>Drop Design</span>
            </span>
          </div>
          <div className="quote-group1000001743">
            <div className="quote-group18972">
              <div className="quote-group189221">
              <label for="blue">
                
                <img
                  alt="Rectangle262204"
                  src="/playground_assets/rectangle262204-to9l.svg"
                  className="quote-rectangle2603"
                />
              </label>
                <div className="quote-group293">
                  <div className="quote-group18971">
                    <img
                      alt="Vector2204"
                      src="/playground_assets/vector2204-jqeb.svg"
                      className="quote-vector"
                    />
                    <img
                      alt="Ellipse152204"
                      src="/playground_assets/ellipse152204-j63h-200w.png"
                      className="quote-ellipse15"
                    />
                  </div>
                </div>
              </div>
              <div className="quote-group18926">
                <label for="yellow">

                <img
                  alt="Rectangle252204"
                  src="/playground_assets/rectangle252204-tbic.svg"
                  className="quote-rectangle25"
                  />
                  </label>
              </div>
              <div className="quote-group18924">
              <label for="green">    
                <img
                  alt="Rectangle252204"
                  src="/playground_assets/rectangle252204-m9ev.svg"
                  className="quote-rectangle2501"
                />
                </label>
              </div>
              <div className="quote-group18928">
                <label for="red">

                <img
                  alt="Rectangle252204"
                  src="/playground_assets/rectangle252204-qm5p.svg"
                  className="quote-rectangle2502"
                  />
                  </label>
              </div>
              <label for="black">
              <div className="quote-group18931">
                <img
                  alt="Rectangle252204"
                  src="/playground_assets/rectangle252204-6m9k.svg"
                  className="quote-rectangle2503"
                />
              </div>
              </label>
              <div className="quote-group1000001751">
                <div className="quote-group18817">
                  <img
                    alt="Rectangle31932204"
                    src="/playground_assets/rectangle31932204-t3p-200h.png"
                    className="quote-rectangle3193"
                  />
                  <label for="single">
                  <div className="quote-group1000001695">
                    <img
                      alt="Rectangle252204"
                      src="/playground_assets/rectangle252204-6waa.svg"
                      className="quote-rectangle2504"
                    />
                    <span className="quote-text015">
                      <span>
                        Single PCB
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                    </span>
                  </div>
                  </label>
                  <label for="customer">

                  <div className="quote-group1000001703">
                    <div className="quote-group10000017021">
                      <img
                        alt="Rectangle262204"
                        src="/playground_assets/rectangle262204-fbi.svg"
                        className="quote-rectangle2604"
                        />
                    </div>
                    <span className="quote-text017">
                      <span>Panel by customer</span>
                    </span>
                  </div>
                        </label>
                       <label for="propcb">
                  <div className="quote-group10000017051">
                    <div className="quote-group10000017022">
                      <img
                        alt="Rectangle262204"
                        src="/playground_assets/rectangle262204-g0sc.svg"
                        className="quote-rectangle2605"
                        />
                      <div className="quote-chevrondown1"></div>
                    </div>
                    <span className="quote-text019">
                      <span>Panel by ProPCB</span>
                    </span>
                  </div>
                        </label> 
                  <img
                    alt="Rectangle522204"
                    src="/playground_assets/rectangle522204-62hn-200h.png"
                    className="quote-rectangle52"
                  />
                  <div className="quote-group189222">
                    <span className="quote-text021">
                      <span>Delivery Format</span>
                  <input type="radio" name="format" value="singlepcb" onChange={handleChange_delivery_format} id="single" />
                  <input type="radio" name="format" value="panelbycustomer" onChange={handleChange_delivery_format} id="customer"/>
                  <input type="radio" name="format" value="panelbypropcb" onChange={handleChange_delivery_format} id="propcb"/>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <span className="quote-text023">
              <span>PCB Colors</span>
            </span>
            
              <input type="radio" name="colors" value="blue" onChange={handleChange_color} id="blue"/> 
              <input type="radio" name="colors" value="green" onChange={handleChange_color} id="green"/>
              <input type="radio" name="colors" value="yellow" onChange={handleChange_color} id="yellow"/>
              <input type="radio" name="colors" value="red" onChange={handleChange_color} id="red"/>
              <input type="radio" name="colors" value="black" onChange={handleChange_color} id="black"/>
              
          </div>
          
          <div className="quote-group10000017511">
            <div className="quote-group188171">
              
            
              <img
                alt="Rectangle31932204"
                src="/playground_assets/rectangle31932204-6p28-200h.png"
                className="quote-rectangle31931"
              />
              
                <label for="surface">
              <div className="quote-group10000016951">
                <img
                  alt="Rectangle252204"
                  src="/playground_assets/rectangle252204-iux9.svg"
                  className="quote-rectangle2505"
                />
                <span className="quote-text025">
                  <span>
                    HASL(with lead)
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </span>
              </div>
                </label>
              <label for="leadfree">
              <div className="quote-group10000017031">
                <div className="quote-group10000017023">
                  <img
                    alt="Rectangle262204"
                    src="/playground_assets/rectangle262204-1a4m.svg"
                    className="quote-rectangle2606"
                  />
                </div>
                <span className="quote-text027">
                  <span>LeadFree HASL-RoHS</span>
                </span>
              </div>
              </label>
              <label for="enig">
              <div className="quote-group10000017052">
                <div className="quote-group10000017024">
                  <img
                    alt="Rectangle262204"
                    src="/playground_assets/rectangle262204-araw.svg"
                    className="quote-rectangle2607"
                  />
                  <div className="quote-chevrondown2"></div>
                </div>
                <span className="quote-text029">
                  <span>ENIG-ROHS</span>
                </span>
              </div>
              </label>
              <img
                alt="Rectangle522204"
                src="/playground_assets/rectangle522204-6jju4-200h.png"
                className="quote-rectangle521"
              />
              <div className="quote-group189223">
                <span className="quote-text031">
                  <span>Surface Finish</span>
                </span>
                <input type="radio" name="finsihing" id="surface" value="HASL" onChange={handleChange_surface_finish} />
                <input type="radio" name="finsihing" id="leadfree" value="HASL-RoHS" onChange={handleChange_surface_finish}/>
                <input type="radio" name="finsihing" id="enig" value="ENIG-RoHS" onChange={handleChange_surface_finish}/>
              
              </div>
            </div>
          </div>
          <div className="quote-group189224">
            <span className="quote-text033">
              <span>Outer Copper Weight</span>
            </span>
            <div className="quote-group10000016941">
              <select value={outer_copper_weight} onChange={handleChange_outer_copper_weight} defaultValue={outer_copper_weight} className='outercoppermenu'>
                <option value="1oz">1oz</option>
                <option value="2oz">2oz</option>
              </select>
            {/* <div class="toggle-button-cover">
      <div class="button-cover">
        <div class="button b2" id="button-18">
          <input type="checkbox" class="checkbox1" />
          <div class="knobs">
            <span></span>
          </div>
          <div class="layer"></div>
        </div>
      </div>
    </div> */}
            </div>
          </div>
          <div className="quote-group10000017032">
            <div className="quote-group10000017025">
              
                <select value={flying_probe_test} defaultValue={flying_probe_test} className="flyingprobetest1" onChange={handleChange_flying_probe_test}>
                  <option value="fullytest" >Fully Test</option>
                  <option value="notest" >No Test</option>
                </select>
              <span className="quote-text039">
              </span>
            </div>
            <span className="quote-text041">
              <span>Flying Probe Test</span>
            </span>
          </div>
        </div>
        <div className="quote-group1000001686">
          <div className="quote-group1000001685">
            <div className="quote-frame123"></div>
            <div className="quote-frame128"></div>
            <div className="quote-email">
              
            <button type="button" class="uploadbtn" data-toggle="modal" data-target="#exampleModal">
              
        <div className="quote-group">
                      <img
                        alt="Vector2201"
                        src="/playground_assets/vector2201-95u.svg"
                        className="quote-vector1"
                      />
                      <img
                        alt="Vector2201"
                        src="/playground_assets/vector2201-cki.svg"
                        className="quote-vector2"
                      />
                      <img
                        alt="Vector2201"
                        src="/playground_assets/vector2201-zmjq.svg"
                        className="quote-vector3"
                      />
                      <div className="quote-group1">
                        <img
                          alt="Vector2201"
                          src="/playground_assets/vector2201-eq2b.svg"
                          className="quote-vector4"
                        />
                        <img
                          alt="Vector2201"
                          src="/playground_assets/vector2201-x9p1.svg"
                          className="quote-vector5"
                        />
                      </div>
                    </div>
                      <p className='uploadbtntext'>Click Here to Upload Files</p>
            </button>
            
              {/* <div className="quote-group280"> */}
{/*                 
                <img
                  alt="Rectangle252201"
                  src="/playground_assets/rectangle252201-ky3e.svg"
                  className="quote-rectangle2506"
                /> */}
                {/* <input
                          className="inputfileinput1"
                          type="file"
                          style={{
                            marginBottom: 0,
                            height: "200px",
                            cursor:"pointer"
                          }}
                          
                          accept=".zip,.rar"
                          onChange={handleFileChange}
                        ></input> */}
                {/* <div className="quote-group18765"> */}
                  {/* <div className="quote-upload">
                    <div className="quote-group">
                      <img
                        alt="Vector2201"
                        src="/playground_assets/vector2201-95u.svg"
                        className="quote-vector1"
                      />
                      <img
                        alt="Vector2201"
                        src="/playground_assets/vector2201-cki.svg"
                        className="quote-vector2"
                      />
                      <img
                        alt="Vector2201"
                        src="/playground_assets/vector2201-zmjq.svg"
                        className="quote-vector3"
                      />
                      <div className="quote-group1">
                        <img
                          alt="Vector2201"
                          src="/playground_assets/vector2201-eq2b.svg"
                          className="quote-vector4"
                        />
                        <img
                          alt="Vector2201"
                          src="/playground_assets/vector2201-x9p1.svg"
                          className="quote-vector5"
                        />
                      </div>
                    </div>
                  </div> */}
                  {/* <span className="quote-text043">
                    <span>Drag’n drop or click to upload files</span>
                  </span> */}
                {/* </div> */}
              {/* </div> */}
            </div>
            <div className="quote-frame120"></div>
            <div className="quote-group1000001793">
              <img
                alt="Rectangle32642204"
                src="/playground_assets/rectangle32642204-yjbe-200h.png"
                className="quote-rectangle3264"
              />
              <span className="quote-text045">
                <span>Confirm Production file</span>
              </span>
              <div className="quote-group1000001794">
              <label class="switch">
              <input value={confirm_production_file} defaultChecked={confirm_production_file} onChange={()=>setconfirm_production_file(!confirm_production_file)}  type="checkbox"/>
  <span class="slider round"></span>
</label>
              </div>
            </div>
            <div className="quote-group10000017941">
              <img
                alt="Rectangle32642204"
                src="/playground_assets/rectangle32642204-ciq-200h.png"
                className="quote-rectangle32641"
              />
              <span className="quote-text047">
                <span>Remove Order Number</span>
              </span>
              <div className="quote-group1000001797">
              <label class="switch">
              <input value={remove_order_number} defaultChecked={remove_order_number} onChange={()=>setremove_order_number(!remove_order_number)}  type="checkbox"/>
  <span class="slider round"></span>
</label>
              </div>
            </div>
          </div>
          <span className="quote-text049">
            <span>PCB Design</span>
          </span>
        </div>
        <div className="quote-group10000017931">
          <img
            alt="Rectangle32642204"
            src="/playground_assets/rectangle32642204-2j7-200h.png"
            className="quote-rectangle32642"
          />
          <span className="quote-text051">
            <span>Castellated holes</span>
          </span>
          <div className="quote-group1000001796">
          <label class="switch">
          <input value={castellated_holes} defaultChecked={castellated_holes} onChange={()=>setcastellated_holes(!castellated_holes)}  type="checkbox"/>
  <span class="slider round"></span>
</label>
          
          </div>
        </div>
        <span className="quote-text053">
        
          <span>Upload Design File</span>
        </span>
        <div className="quote-frame1201">
        
          <div className="quote-email1">
            <span className="quote-text055">
              <span>Base Material</span>
            </span>
            {/* <input type="radio" name="material" value="" checked={basematerial===""} id="material0" onChange={handleChange_basematerial}/>     */}
        <input type="radio" name="material" value="fr4" id="material1"  onChange={handleChange_basematerial}/>
        <input type="radio" name="material" value="aluminium" id="material2"  onChange={handleChange_basematerial} />
            <label for="material0"></label>

            {/* -------1---- */}
            <label htmlFor="material1">    
            <div className="quote-group10000017002">
              
              <img
                alt="Rectangle262204"
                src="/playground_assets/rectangle262204-k6xv.svg"
                className="quote-rectangle2609"
              />
              
              <img
                alt="fr4image12204"
                src="/playground_assets/fr4image12204-b2ys-200h.png"
                className="quote-fr4image1"
              />
              <label for="material1">
              <span className="quote-text057">
              
                <span>FR-4</span>
                
              </span>
              </label>
            </div>
              </label>

          </div>
        </div>
        
        
        <div className="quote-group1000001801">
        
          <div className="quote-group10000017033">
          
              <img
                alt="Rectangle262204"
                src="/playground_assets/rectangle262204-q878.svg"
                className="quote-rectangle2610"
              />
            <div className="quote-group10000017026">
            <label for="material2">
               
              <span className="quote-text059">
                <span>Aluminium

              <img
                alt="aluminiumimage12204"
                src="/playground_assets/aluminiumimage12204-od5a-200h.png"
                className="quote-aluminiumimage1"
              />
                </span>
              </span>
              </label>
            </div>
          </div>
          <label for="material2">
          <img
            alt="aluminiumimage22204"
            src="/playground_assets/aluminiumimage22204-ihke-200h.png"
            className="quote-aluminiumimage2"
          />
          </label>
        </div>
        
        <div className="quote-group10000017932">
          <img
            alt="Rectangle32642204"
            src="/playground_assets/rectangle32642204-bdua-200h.png"
            className="quote-rectangle32643"
          />
          <span className="quote-text061">
            <span>Gold Fingers</span>
          </span>
          <div className="quote-group1000001795">
          <label class="switch">
  <input value={gold_fingers} defaultChecked={gold_fingers} onChange={()=>setgold_fingers(!gold_fingers)}  type="checkbox"/>
  
  <span class="slider round"></span>
</label>
            
          </div>
        </div>
        <img
          alt="Rectangle32652204"
          src="/playground_assets/rectangle32652204-1rvj.svg"
          className="quote-rectangle3265"
        />
        <span className="quote-text063">
          <span>Silkscreen</span>
          <input type="radio" name="silkscreen" id="silkscreen1" value="silver" onChange={handleChange_silkscreen} />
          <input type="radio" name="silkscreen" id="silkscreen2" value="black" onChange={handleChange_silkscreen} />
        </span>
        <label for="silkscreen1">

        <div className="quote-group189311">
          <img
            alt="Rectangle252204"
            src="/playground_assets/rectangle252204-m07w.svg"
            className="quote-rectangle2507"
            />
        </div>
            </label>
            <label for="silkscreen2">

        <div className="quote-group10000017942">
          <img
            alt="Rectangle252204"
            src="/playground_assets/rectangle252204-12co.svg"
            className="quote-rectangle2508"
            />
        </div>
            </label>
        <div className="quote-group1000001800">
          <img
            alt="Rectangle32662204"
            src="/playground_assets/rectangle32662204-ytum.svg"
            className="quote-rectangle3266"
          />
          <img
            alt="Rectangle32672204"
            src="/playground_assets/rectangle32672204-1amf-500w.png"
            className="quote-rectangle3267"
          />
          <div className="quote-logo">
            <div className="quote-video-wiki-logo">
              <span className="quote-text065">
                <span>Charge Details</span>
              </span>
            </div>
          </div>
          <div className="quote-group10000016892">
            <div className="quote-btn4">
              <img
                alt="Rectangle2204"
                src="/playground_assets/rectangle2204-o58p.svg"
                className="quote-rectangle6"
              />
              <span className="quote-text067">
                <span>ADD TO CART</span>
              </span>
            </div>
          </div>
          <span className="quote-text069">
            <span>
              <span>
                *Custom quote will be sent on to mail for quantity above 50
              </span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
            </span>
          </span>
          <span className="quote-text078">
            <span>INR 800</span>
          </span>
          <span className="quote-text080">
            <span>INR 520</span>
          </span>
          <span className="quote-text082">
            {console.log("toatl is ",total)}
            <span>{total}</span>
          </span>
        </div>
        <img
          alt="Rectangle532212"
          src="/playground_assets/rectangle532212-jj96-200w.png"
          className="quote-rectangle53"
        />
        <img
          alt="Rectangle32692214"
          src="/playground_assets/rectangle32692214-mo8-200w.png"
          className="quote-rectangle3269"
        />
        <img
          alt="Rectangle32722215"
          src="/playground_assets/rectangle32722215-7cb8-500w.png"
          className="quote-rectangle3272"
        />
        <img
          alt="Rectangle32742215"
          src="/playground_assets/rectangle32742215-hb8b-200h.png"
          className="quote-rectangle3274"
        />
        <img
          alt="Rectangle32732215"
          src="/playground_assets/rectangle32732215-eat-1600w.png"
          className="quote-rectangle3273"
        />
        <img
          alt="Rectangle32712214"
          src="/playground_assets/rectangle32712214-gws-200w.png"
          className="quote-rectangle3271"
        />
        <img
          alt="Rectangle32752219"
          src="/playground_assets/rectangle32752219-bv2f-200h.png"
          className="quote-rectangle3275"
        />
        <span className="quote-text084">
          <span>Dimension</span>
        </span>
        <div className="quote-group10000017011">
          <div className="quote-group10000017003">
{/*             
            <img
              alt="Rectangle262219"
              src="/playground_assets/rectangle262219-c538.svg"
              className="quote-rectangle2611"
            /> */}
            
            
              <input onChange={handleChange_dimension_width} className="dimensioninput1" type="number"></input>
            <span className="quote-text086">
              {/* <span>100</span> */}
            </span>
          </div>
        </div>
        <div className="quote-group1000001802">
          <div className="quote-group10000017004">
            {/* <img
              alt="Rectangle262219"
              src="/playground_assets/rectangle262219-02an.svg"
              className="quote-rectangle2612"
            /> */}
            <input onChange={handleChange_dimension_height} className="dimensioninput1" type="number"></input>
            <span className="quote-text088">
              {/* <span>100</span> */}
            </span>
          </div>
        </div>
        <div className="quote-group1000001804">
          <div className="quote-group1000001699">
            <div className="quote-group10000016952">
             
              <select value={dimension_unit} onChange={handleChange_dimension_unit} className="dimensioninput3">
                <option value="mm">mm</option>
                <option value="inch">inch</option>
              </select>
             
            </div>
          </div>
         
        </div>
        <span className="quote-text092">*</span>
        <div className="quote-group427">
          <div className="quote-group426">
            <div className="quote-subscirbe-newslatter">
              <div className="quote-heading-subtext">
                <span className="quote-text093">
                  <span>Subscribe to our newsletter</span>
                </span>
                <span className="quote-text095">
                  <span>
                    Subscribe our newsletter and stay up to date about the
                    ProPCB
                  </span>
                </span>
              </div>
              <div className="quote-from">
                <div className="quote-email2">
                  <div className="quote-frame219">
                    <div className="quote-group233">
                      <div className="quote-email11">
                        <div className="quote-group2">
                          <div className="quote-group3">
                            <img
                              alt="Vector4171"
                              src="/playground_assets/vector4171-ho1i.svg"
                              className="quote-vector6"
                            />
                          </div>
                        </div>
                      </div>
                      <span className="quote-text097">
                        <span>Email Address</span>
                      </span>
                    </div>
                  </div>
                  <div className="quote-btnblue">
                    <span className="quote-text099">
                      <span>Sign Up</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="quote-footer">
            <div className="quote-footer1">
              <img
                alt="base4171"
                src="/playground_assets/base4171-9cqxb-1500w.png"
                className="quote-base"
              />
              <span className="quote-text101">
                <span>Terms Privacy License</span>
              </span>
              <img
                alt="Line4171"
                src="/playground_assets/line4171-s86j-200h.png"
                className="quote-line"
              />
              <div className="quote-additional-navigation">
                <span className="quote-text103">
                  <span>
                    <span>
                      Returns
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <br></br>
                    <span>Support policy</span>
                    <br></br>
                    <span>Size guide</span>
                    <br></br>
                    <span>FAQs</span>
                  </span>
                </span>
                <span className="quote-text112">
                  <span>Useful Links</span>
                </span>
                <span className="quote-text114">
                  <span>
                    <span>
                      About us
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <br></br>
                    <span>Store location</span>
                    <br></br>
                    <span>Contact</span>
                    <br></br>
                    <span>Orders tracking</span>
                  </span>
                </span>
                <span className="quote-text123">
                  <span>About Us</span>
                </span>
                <span className="quote-text125">
                  <span>Follow us</span>
                </span>
                <span className="quote-text127">
                  <span>
                    <span>Linked in</span>
                    <br></br>
                    <span>Facebook</span>
                    <br></br>
                    <span>Twitter</span>
                    <br></br>
                    <span>Youtube</span>
                  </span>
                </span>
                <img
                  alt="icontwitter4171"
                  src="/playground_assets/icontwitter4171-du0l.svg"
                  className="quote-icontwitter"
                />
                <img
                  alt="iconfb4171"
                  src="/playground_assets/iconfb4171-is5.svg"
                  className="quote-iconfb"
                />
                <div className="quote-social-icons">
                  <img
                    alt="LinkedIn4171"
                    src="/playground_assets/linkedin4171-i70m.svg"
                    className="quote-linked-in"
                  />
                </div>
              </div>
              <div className="quote-group1000001805">
                <div className="quote-video-wiki-logo1">
                  <img
                    alt="tvit12219"
                    src="/playground_assets/tvit12219-1ia-200h.png"
                    className="quote-tvit1"
                  />
                  <span className="quote-text136">
                    <span>ProPCB</span>
                  </span>
                </div>
                <span className="quote-text138">
                  <span>
                    ProPCB is an open Collaboratory content editing platform
                    that enables rapid creation, modification, protection and
                    monetization of immersive content.
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <span className="quote-text140">
          <span className="quote-text141">
            <span></span>
            <br></br>
            <span>Engineering fee</span>
            <br></br>
            <span>Board</span>
            <br></br>
            <span></span>
          </span>
          <span className="quote-text149">
            <span></span>
            <br></br>
            <span></span>
            <br></br>
            <span></span>
          </span>
          <span className="quote-text155">
            <span>Calculated Price</span>
            <br></br>
            <span></span>
          </span>
          <span className="quote-text159">
            <span></span>
            <br></br>
            <span></span>
            <br></br>
            <span></span>
          </span>
          <span>Weight: 3kg</span>
        </span>
      </div>
    </div>
    {console.log("Fianl : ")}
    {console.log("Base Material : ",basematerial)}
    {console.log("Color : ",color)}
    {console.log("Delivery Format : ",delivery_format)}
    {console.log("Silkscreen : ",silkscreen)}
    {console.log("Surface Finish : ",surface_finish)}
    {console.log("Flying Probe Test : ",flying_probe_test)}
    {console.log("PCB Thickness : ",pcb_thickness)}
    {console.log("Drop Design : ",drop_design)}
    {console.log("PCB Qty : ",pcb_quantity)}
    {console.log("Gold Fingers : ",gold_fingers)}
    {console.log("Castellated Holes : ",castellated_holes)}
    {console.log("Confirm Production Files : ",confirm_production_file)}
    {console.log("Remove Order Number : ",remove_order_number)}
    {console.log("Layers : ",layer)}
    {console.log("Outer Copper Weight : ",outer_copper_weight)}
    {console.log("Dimension : ",dimension_width,dimension_height,dimension_unit)}
    
    {console.log("Total : ",total)}
    {console.log("--------Over--------")}
    </>
  )
}

export default Quote
