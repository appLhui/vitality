package com.visionet.webservice.client;  
  
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.dne.sloth.webservice.http.CrmHttp;
import com.visionet.webservice.server.vo.CustomerInfo;


  
public class ClientTest {  
  
    public static void main(String[] args) {  
        ApplicationContext context = new ClassPathXmlApplicationContext("com/visionet/webservice/config/spring-crm-client.xml");
        
        
        try {
			CrmHttp rm = (CrmHttp)context.getBean("getCrmClient");
			CustomerInfo ci = rm.getCustomerInfo(1);
        	System.out.println("---getCustomerName="+ci.getCustomerName());
        	System.out.println("---getPhone="+ci.getPhone());
        	
		} catch (Exception e) {
			e.printStackTrace();
		}
        
        
    }  
  
}  