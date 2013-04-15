package com.visionet.demo.model.customer;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import com.visionet.common.model.AbstractModel;
import com.visionet.common.web.validator.DateFormat;

/**
 * User: Visionet
 * Date: 12-1-4 下午3:12
 * Version: 1.0
 */
@Entity
@Table(name = "s_customer_info")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CustomerModel extends AbstractModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CUSTOMER_ID", nullable = false)
    private int customerId;	//客户ID    
    
    @Column(name = "CUSTOMER_NAME")
	private String customerName;    //客户名称    
    
    @Column(name = "ADDRESS")
	private String address;         //地址        
    
    @Column(name = "LINKMAN")
	private String linkman;         //联系人      
    
    @Column(name = "POST_CODE")
	private String postCode;        //邮政编码    
    
    @Column(name = "PHONE")
	private String phone;           //电话        
    
    @Column(name = "FAX")
	private String fax;             //传真        
    
    @Column(name = "MOBILE")
	private String mobile;          //手机        
    
    @Column(name = "EMAIL")
    @Email(message = "{email.illegal}")
	private String email;           //电子邮件    
    
    @Column(name = "CITY_NAME")
	private String cityName;        //城市        
    
    @Column(name = "PROVINCE_NAME")
	private String provinceName;    //省份     
    
    @Column(name = "REMARK")
	private String remark;          //备注        
    
    @Column(name = "COMPANY_ID",updatable=false)
	private Long companyId;    
    
    @Column(name = "DEL_FLAG")
	private int delFlag;               
    
    @Column(name = "CREATE_DATE")
	private Date createDate;
    
    @Column(name = "UPDATE_BY")
	private Long updateBy;
    
    @Column(name = "CREATE_BY")
	private Long createBy;
    
    @Column(name = "UPDATE_DATE")
	private Date updateDate;
    
    
    
    
    
    
    public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getLinkman() {
		return linkman;
	}
	public void setLinkman(String linkman) {
		this.linkman = linkman;
	}
	public String getPostCode() {
		return postCode;
	}
	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public String getProvinceName() {
		return provinceName;
	}
	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getDelFlag() {
		return delFlag;
	}
	public void setDelFlag(int delFlag) {
		this.delFlag = delFlag;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Long getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(Long updateBy) {
		this.updateBy = updateBy;
	}
	public Long getCreateBy() {
		return createBy;
	}
	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	
	public Long getCompanyId() {
		return companyId;
	}
	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	
	
	@Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + customerId;
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        CustomerModel other = (CustomerModel) obj;
        if (customerId != other.customerId)
            return false;
        return true;
    }
    
    
    
}
