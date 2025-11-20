package com.example.budgeter.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 40)
    @NotNull
    @Column(name = "name", nullable = false, length = 40)
    private String name;

    @Size(max = 40)
    @NotNull
    @Column(name = "mail", nullable = false, length = 40)
    private String mail;

    @Size(max = 40)
    @NotNull
    @Column(name = "password", nullable = false, length = 40)
    private String password;

    @Size(max = 40)
    @Column(name = "nickname", length = 40)
    private String nickname;

    @NotNull
    @Column(name = "dateofbirth", nullable = false)
    private LocalDate dateofbirth;

}