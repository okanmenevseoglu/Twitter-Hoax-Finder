package com.menevseoglu.okan.twitterhoaxfinder.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.Date;

@Data
public class HoaxFinderSearchRequest {

    @NotEmpty
    @Length(max = 140)
    private String query;

    private String lang;

    private String screenName;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date until;
}