# EduVance Academy — Terraform Variables

variable "aws_region" {
  description = "AWS region where resources are deployed"
  type        = string
  default     = "ap-southeast-2"
}

variable "project_name" {
  description = "Project name used for naming all resources"
  type        = string
  default     = "eduvance"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}

variable "amplify_app_id" {
  description = "AWS Amplify App ID"
  type        = string
  default     = "dc7hjd4bn6ptw"
}

variable "alert_email" {
  description = "Email address to receive CloudWatch alerts"
  type        = string
  default     = "jannani2007vibes@gmail.com"
}
