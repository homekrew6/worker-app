{/* <View style={{ flexDirection: 'row', paddingTop: 20, }} >
<View style={{ flex: 2 }} ></View>
<TouchableOpacity onPress={this.DecreaseTiming.bind(this)}>
    <View><Image source={require('./left-arrow.png')} style={{ width: 24, height: 24 }} /></View>
</TouchableOpacity>
<View style={{ flexDirection: 'row', flex: 8, }} >
    <View style={styleSelf.TimingContainer} >
        <Text style={styleSelf.TimingText}>{this.state.time1}</Text>
    </View>
    <View style={styleSelf.TimingContainer} >
        <Text style={styleSelf.TimingText} >{this.state.time2}</Text>
    </View>
    <View style={styleSelf.TimingContainer} >
        <Text style={styleSelf.TimingText} >{this.state.time3}</Text>
    </View>
    <View style={styleSelf.TimingContainer} >
        <Text style={styleSelf.TimingText} >{this.state.time4}</Text>
    </View>
    <View style={styleSelf.TimingContainer} >
        <Text style={styleSelf.TimingText} >{this.state.time5}</Text>
    </View>

</View>
<TouchableOpacity onPress={this.IncreaseTiming.bind(this)}>
    <View><Image source={require('./right-arrow.png')} style={{ width: 24, height: 24 }} /></View>
</TouchableOpacity>
</View>

<View style={{ flexDirection: 'row', paddingTop: 20, }} >
<View style={{ flex: 2 }} >
    <Text>Sun</Text>
</View>
<View style={{ flexDirection: 'row', flex: 8, }} >
    <CheckBox status={false}/>
    <CheckBox status={true}/>
    <CheckBox status={false}/>
    <CheckBox status={true}/>
    <CheckBox status={false}/>
</View>
</View>

<View style={{ flexDirection: 'row',  paddingTop: 20, }} >
<View style={{ flex: 2 }} >
    <Text>Mon</Text>
</View>
<View style={{ flexDirection: 'row', flex: 8,}} >
    <CheckBox status={false}/>
    <CheckBox status={true}/>
    <CheckBox status={false}/>
    <CheckBox status={true}/>
    <CheckBox status={false}/>
</View>
</View>

<View style={{ flexDirection: 'row',  paddingTop: 20, }} >
<View style={{ flex: 2 }} >
    <Text>Tue</Text>
</View>
<View style={{ flexDirection: 'row', flex: 8,}} >
    <CheckBox status={false}/>
    <CheckBox status={true}/>
    <CheckBox status={false}/>
    <CheckBox status={true}/>
    <CheckBox status={false}/>
</View>
</View>
<View style={{ flexDirection: 'row',  paddingTop: 20, }} >
<View style={{ flex: 2 }} >
    <Text>Wed</Text>
</View>
<View style={{ flexDirection: 'row', flex: 8,}} >
    <CheckBox status={false}/>
    <CheckBox status={true}/>
    <CheckBox status={false}/>
    <CheckBox status={true}/>
    <CheckBox status={false}/>
</View>
</View> */}







const data = [
        {
            "id": 1,
            "date": "8-03-2018",
            "time": "8 am",
            "sun": true,
            "mon": false,
            "tue": false,
            "wed": false,
            "thu": false,
            "fri": false,
            "sat": true
        },
        {
            "id": 2,
            "date": "8-03-2018",
            "time": "9 am",
            "sun": true,
            "mon": false,
            "tue": false,
            "wed": false,
            "thu": false,
            "fri": false,
            "sat": true
        }
    ];


function getOffDay(day, data){
  for(var i = 0; i < data.length; i++){
    var day_status = data[i][day];
    var timing = data[i].time;
    console.log(timing);

  }
}


getOffDay('mon', data);
