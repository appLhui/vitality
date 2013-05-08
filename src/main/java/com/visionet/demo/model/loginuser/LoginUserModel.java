package com.visionet.demo.model.loginuser;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.Email;

import com.visionet.common.model.AbstractModel;


@Entity
@Table(name = "c_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LoginUserModel extends AbstractModel{
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    @Column(name = "ID", nullable = false)
	    private int id;	//客户ID    
	    
	    @Column(name = "LoginName")
		private String loginName;    //客户名称   
	    
	    @Column(name = "CREATEDATE")
		private Date createDate;
	    
	    @Column(name = "MODIFYDATE")
		private Date modifyDate;         //地址        
	    
	    @Column(name = "PASSWORD")
		private String password;         //联系人      
	    
	    @Column(name = "REMINDERQUESTION")
		private String reminderQuestion;        //邮政编码    
	    
	    @Column(name = "REMINDERANSWER")
		private String reminderAnswer;           //电话        
	    
	    @Column(name = "EMAILADDRESS")
	    @Email(message = "{emailAddress.illegal}")
		private String emailAddress;             //传真        
	    
	    @Column(name = "CELLPHONE")
		private String cellPhone;          //手机        
	    
	    @Column(name = "LASTLOGINIP")	  
		private String lastLoginIp;           //电子邮件    
	    
	    @Column(name = "LASTLOGINDATE")
		private Date lastLoginDate;        //城市        
	    
	    @Column(name = "LANGUAGEID")
		private String languageId;    //省份     
	    
	    @Column(name = "TIMEZONEID")
		private String timeZoneId;          //备注        
	    
	    @Column(name = "GREETING")
		private String greeting;    
	    
	    @Column(name = "LASTFAILEDLOGINIP")
		private String lastFailedLoginIp;               
	    
	   
	    
	    @Column(name = "LASTFAILEDLOGINDATE")
		private Date lastFailedLoginDate;
	    
	    @Column(name = "FailedLOGINATTEMPTS")
		private Integer failedLoginAttempts;
	    
	    @Column(name = "LOCKOUT")
		private int lockOut;
	    
	    @Column(name = "LOCKOUTDATE")
		private Date lockOutDate;
	    @Column(name = "STATUS")
		private int status;
	    @Column(name = "FIRSTNAME")
		private String firstName;
	    @Column(name = "MIDDLENAME")
		private String middleName;
	    @Column(name = "LASTNAME")
		private String lastName;
	    @Column(name = "COMPANYID")
		private int companyId;
	    @Column(name = "GROUPID")
		private Integer groupId;
	    @Column(name = "BAKINT1")
		private Integer bakInt1;
	    @Column(name = "BAKINT2")
		private Integer bakInt2;
	    @Column(name = "BAKINT3")
		private Integer bakInt3;
	    @Column(name = "BAKSTR1")
		private String bakStr1;
	    @Column(name = "BAKSTR2")
		private String bakStr2;
	    @Column(name = "BAKSTR3")
		private String bakStr3;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getLoginName() {
			return loginName;
		}
		public void setLoginName(String loginName) {
			this.loginName = loginName;
		}
		public Date getCreateDate() {
			return createDate;
		}
		public void setCreateDate(Date createDate) {
			this.createDate = createDate;
		}
		public Date getModifyDate() {
			return modifyDate;
		}
		public void setModifyDate(Date modifyDate) {
			this.modifyDate = modifyDate;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getReminderQuestion() {
			return reminderQuestion;
		}
		public void setReminderQuestion(String reminderQuestion) {
			this.reminderQuestion = reminderQuestion;
		}
		public String getReminderAnswer() {
			return reminderAnswer;
		}
		public void setReminderAnswer(String reminderAnswer) {
			this.reminderAnswer = reminderAnswer;
		}
		public String getEmailAddress() {
			return emailAddress;
		}
		public void setEmailAddress(String emailAddress) {
			this.emailAddress = emailAddress;
		}
		public String getCellPhone() {
			return cellPhone;
		}
		public void setCellPhone(String cellPhone) {
			this.cellPhone = cellPhone;
		}
		public String getLastLoginIp() {
			return lastLoginIp;
		}
		public void setLastLoginIp(String lastLoginIp) {
			this.lastLoginIp = lastLoginIp;
		}
		public Date getLastLoginDate() {
			return lastLoginDate;
		}
		public void setLastLoginDate(Date lastLoginDate) {
			this.lastLoginDate = lastLoginDate;
		}
		public String getLanguageId() {
			return languageId;
		}
		public void setLanguageId(String languageId) {
			this.languageId = languageId;
		}
		public String getTimeZoneId() {
			return timeZoneId;
		}
		public void setTimeZoneId(String timeZoneId) {
			this.timeZoneId = timeZoneId;
		}
		public String getGreeting() {
			return greeting;
		}
		public void setGreeting(String greeting) {
			this.greeting = greeting;
		}
		public String getLastFailedLoginIp() {
			return lastFailedLoginIp;
		}
		public void setLastFailedLoginIp(String lastFailedLoginIp) {
			this.lastFailedLoginIp = lastFailedLoginIp;
		}
		public Date getLastFailedLoginDate() {
			return lastFailedLoginDate;
		}
		public void setLastFailedLoginDate(Date lastFailedLoginDate) {
			this.lastFailedLoginDate = lastFailedLoginDate;
		}
		
		public Integer getFailedLoginAttempts() {
			return failedLoginAttempts;
		}
		public void setFailedLoginAttempts(Integer failedLoginAttempts) {
			this.failedLoginAttempts = failedLoginAttempts;
		}
		public int getLockOut() {
			return lockOut;
		}
		public void setLockOut(int lockOut) {
			this.lockOut = lockOut;
		}
		public Date getLockOutDate() {
			return lockOutDate;
		}
		public void setLockOutDate(Date lockOutDate) {
			this.lockOutDate = lockOutDate;
		}
		public int getStatus() {
			return status;
		}
		public void setStatus(int status) {
			this.status = status;
		}
		public String getFirstName() {
			return firstName;
		}
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public String getMiddleName() {
			return middleName;
		}
		public void setMiddleName(String middleName) {
			this.middleName = middleName;
		}
		public String getLastName() {
			return lastName;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		public int getCompanyId() {
			return companyId;
		}
		public void setCompanyId(int companyId) {
			this.companyId = companyId;
		}
		
		
		public Integer getGroupId() {
			return groupId;
		}
		public void setGroupId(Integer groupId) {
			this.groupId = groupId;
		}
		public Integer getBakInt1() {
			return bakInt1;
		}
		public void setBakInt1(Integer bakInt1) {
			this.bakInt1 = bakInt1;
		}
		public Integer getBakInt2() {
			return bakInt2;
		}
		public void setBakInt2(Integer bakInt2) {
			this.bakInt2 = bakInt2;
		}
		public Integer getBakInt3() {
			return bakInt3;
		}
		public void setBakInt3(Integer bakInt3) {
			this.bakInt3 = bakInt3;
		}
		public String getBakStr1() {
			return bakStr1;
		}
		public void setBakStr1(String bakStr1) {
			this.bakStr1 = bakStr1;
		}
		public String getBakStr2() {
			return bakStr2;
		}
		public void setBakStr2(String bakStr2) {
			this.bakStr2 = bakStr2;
		}
		public String getBakStr3() {
			return bakStr3;
		}
		public void setBakStr3(String bakStr3) {
			this.bakStr3 = bakStr3;
		}
	    
	    
}
