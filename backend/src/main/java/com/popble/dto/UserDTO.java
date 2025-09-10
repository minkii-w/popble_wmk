package com.popble.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class UserDTO extends User {
	
	private String loginId;
	
	private String password;
	
	private String name;
	
	private boolean social;
	
	
	private List<String> roleNames = new ArrayList<>();
	
	public UserDTO(String loginId, String password, String name, boolean social, List<String> rolenames ) {
		super(
	loginId,password, rolenames.stream().map(str -> new SimpleGrantedAuthority("ROLE_"+str)).collect(Collectors.toList()));
	
			this.loginId = loginId;
			this.password = password;
			this.name = name;
			this.social = social;
			this.roleNames = rolenames;
	}
	
	public Map<String, Object> getClaims() {
		Map<String, Object> dataMap = new HashMap<>();
		
		dataMap.put("loginId", loginId);
		dataMap.put("password", password);
		dataMap.put("name", name);
		dataMap.put("social", social);
		dataMap.put("roleNames", roleNames);
		
		return dataMap;
	}
	
	
	
	
	
}
