package com.xnjr.home.front.ao;

public interface IPositionAO {
	/**
	 * 发布职位
	 * @param name
	 * @param kind
	 * @param province
	 * @param city
	 * @param experience
	 * @param education
	 * @param type
	 * @param jobNum
	 * @param msalary
	 * @param description
	 * @param companyCode
	 * @param publisher
	 * @return
	 */
	public Object publishPosition(String name, String kind,
			String province, String city, String experience,
			String education, String type, String jobNum,
			String msalary, String description, String companyCode,
			String publisher);
	
	/**
	 * 修改职位
	 * @param code
	 * @param name
	 * @param kind
	 * @param province
	 * @param city
	 * @param experience
	 * @param education
	 * @param type
	 * @param jobNum
	 * @param msalary
	 * @param description
	 * @param companyCode
	 * @param publisher
	 * @return
	 */
	public Object editPosition(String code, String name, String kind,
			String province, String city, String experience,
			String education, String type, String jobNum,
			String msalary, String description, String companyCode,
			String publisher);
	
	/**
	 * 删除职位
	 * @param code
	 * @return
	 */
	public Object deletePosition(String code);
	
	/**
	 * 分页查询职位
	 * @param name
	 * @param companyCode
	 * @param companyName
	 * @param isHot
	 * @param start
	 * @param limit
	 * @return
	 */
	public Object queryPagePosition(String name, String companyCode, String isHot,
    		String companyName, String start, String limit);
	
	/**
	 * 详情查询职位
	 * @param code
	 * @return
	 */
	public Object queryPositionInfo(String code);
}