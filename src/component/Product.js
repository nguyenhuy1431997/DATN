import React,{Component} from 'react';



class Product extends Component {

	constructor(props){
		super(props);
		this.state={
			Products:[
				{
					id:1,
					name:"nguyễn văn a",
					tuoi:25,
					diachi:"hòa thạch-đại hòa-đại lộc-quảng nam"
				},
				{
					id:2,
					name:"phạm thị thanh hằng",
					tuoi:24,
					diachi:"hòa khánh bắc-liên chiển-đà nẵng"
				},
				{
					id:3,
					name:"lê lý thị mộng",
					tuoi:26,
					diachi:"thôn 3-đại an-đại lộc-quảng nam"
				},
				{
					id:4,
					name:"trần văn lang thang",
					tuoi:30,
					diachi:"hòa thạch-đại hòa-đại lộc-quảng nam"
				}
			],
			button:true
		};	
	}
	abc(){
        this.setState({
            button:!this.state.button
        });
        if(this.state.button){
            return  <table>
                        <thead>
                            <tr>
                                <td>stt</td>
                                <td>tên</td>
                                <td>tuổi</td>
                                <td>địa chỉ</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
        } 
    }

    render(){
    	let a =this.state.Products.map((product,index)=>{
    		if(this.state.button){
		    	return	<tr key={index}>
		    				<td>{product.id}</td>
		    				<td>{product.name}</td>
		    				<td>{product.tuoi}</td>
		    				<td>{product.diachi}</td>
		    			</tr>
		    }
    	});
        return (
            <div>
            	<table>
            		<thead>
            			<tr>
            				<td>stt</td>
            				<td>tên</td>
            				<td>tuổi</td>
            				<td>địa chỉ</td>
            			</tr>
            		</thead>
            		<tbody>
            			{a}
            		</tbody>
            	</table>
            	<button onClick={()=>{this.abc()}}>
                    button:{this.state.button===true ? "true":"false"}
                </button>
            </div>
        );
    }

}

export default Product;
