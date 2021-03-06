package com.xnjr.home.front.req;

public class XN612050Req {
	
	//publisher (选填)	用户编号
	private String publisher;

	//qualityCode (选填)	资质类型
	private String type;

	//urgentLevel (选填)	紧急程度	1 紧急 0 不紧急
	private String urgentLevel;

	//dateStart (选填)	发布时间起
	private String dateStart;

	//dateEnd (选填)	发布时间止
	private String dateEnd;

	//处理人 (选填)
	private String dealer;

	//start（必填）	第几页
	private String start;

	//limit（必填）	页面个数
	private String limit;
	
	//
	private String status;
	
	private String companyCode;

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUrgentLevel() {
		return urgentLevel;
	}

	public void setUrgentLevel(String urgentLevel) {
		this.urgentLevel = urgentLevel;
	}

	public String getDateStart() {
		return dateStart;
	}

	public void setDateStart(String dateStart) {
		this.dateStart = dateStart;
	}

	public String getDateEnd() {
		return dateEnd;
	}

	public void setDateEnd(String dateEnd) {
		this.dateEnd = dateEnd;
	}

	public String getDealer() {
		return dealer;
	}

	public void setDealer(String dealer) {
		this.dealer = dealer;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getLimit() {
		return limit;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}
	
}
